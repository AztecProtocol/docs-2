import type { Root, Paragraph, Text, Code } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

import { extractCodeWithMetadata } from './code-extractor';

interface IncludeCodeOptions {
  rootDir: string;
  commitTag?: string;
}

interface ParsedMacro {
  fullMatch: string;
  identifier: string;
  filePath: string;
  language: string;
  options: {
    noTitle: boolean;
    noLineNumbers: boolean;
    noSourceLink: boolean;
  };
}

/**
 * Parse an #include_code macro line
 * Format: #include_code identifier path/to/file.ext language [options]
 */
function parseMacro(text: string): ParsedMacro | null {
  // Regex to match: #include_code identifier filepath language [optional_params]
  const regex = /^#include_code\s+(\S+)\s+(\S+)\s+(\S+)(?:\s+(\S+))?$/;
  const match = text.trim().match(regex);

  if (!match) {
    return null;
  }

  const [fullMatch, identifier, filePath, language, optionsStr = ''] = match;

  return {
    fullMatch,
    identifier,
    filePath,
    language,
    options: {
      noTitle: optionsStr.includes('noTitle'),
      noLineNumbers: optionsStr.includes('noLineNumbers'),
      noSourceLink: optionsStr.includes('noSourceLink'),
    },
  };
}

/**
 * Create a code block node with metadata
 */
function createCodeBlock(
  code: string,
  language: string,
  identifier: string,
  options: ParsedMacro['options']
): Code {
  const meta: string[] = [];

  if (!options.noTitle) {
    meta.push(`title="${identifier}"`);
  }

  if (!options.noLineNumbers) {
    meta.push('showLineNumbers');
  }

  return {
    type: 'code',
    lang: language,
    meta: meta.join(' ') || undefined,
    value: code,
  };
}

/**
 * Create a paragraph node with a source link
 */
function createSourceLinkNode(sourceLink: string, filePath: string): Paragraph {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'html',
        value: `<sup><sub><a href="${sourceLink}" target="_blank" rel="noopener noreferrer">Source code: ${filePath}</a></sub></sup>`,
      },
    ],
  };
}

/**
 * Remark plugin to process #include_code macros
 */
export const remarkIncludeCode: Plugin<[IncludeCodeOptions?], Root> = (options) => {
  const rootDir = options?.rootDir || process.cwd();
  const commitTag = options?.commitTag;

  return (tree, file) => {
    const nodesToReplace: Array<{
      node: Paragraph;
      index: number;
      parent: any;
      replacements: Array<Code | Paragraph>;
    }> = [];

    // Visit all paragraph nodes that might contain our macro
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;

      // Check if this paragraph contains a single text node with our macro
      if (node.children.length === 1 && node.children[0].type === 'text') {
        const textNode = node.children[0] as Text;
        const parsed = parseMacro(textNode.value);

        if (parsed) {
          try {
            // Ensure the file path starts with / for proper resolution
            let codeFilePath = parsed.filePath;
            if (!codeFilePath.startsWith('/')) {
              codeFilePath = '/' + codeFilePath;
            }

            // Extract code snippet
            const { code, sourceLink } = extractCodeWithMetadata(
              rootDir,
              codeFilePath,
              parsed.identifier,
              commitTag
            );

            // Handle "raw" language (no code block formatting)
            if (parsed.language === 'raw') {
              nodesToReplace.push({
                node,
                index,
                parent,
                replacements: [
                  {
                    type: 'code',
                    value: code,
                  } as Code,
                ],
              });
              return;
            }

            // Create code block and optionally a source link
            const codeBlock = createCodeBlock(
              code,
              parsed.language,
              parsed.identifier,
              parsed.options
            );

            const replacements: Array<Code | Paragraph> = [codeBlock];

            // Add source link if not disabled
            if (!parsed.options.noSourceLink) {
              const linkNode = createSourceLinkNode(
                sourceLink,
                `${parsed.filePath}#L${parsed.identifier}`
              );
              replacements.push(linkNode);
            }

            nodesToReplace.push({
              node,
              index,
              parent,
              replacements,
            });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            file.message(
              `Error processing #include_code macro: ${errorMessage}`,
              node.position,
              'remark-include-code'
            );
          }
        }
      }
    });

    // Perform all replacements (in reverse order to maintain indices)
    nodesToReplace.reverse().forEach(({ index, parent, replacements }) => {
      parent.children.splice(index, 1, ...replacements);
    });
  };
};

export default remarkIncludeCode;
