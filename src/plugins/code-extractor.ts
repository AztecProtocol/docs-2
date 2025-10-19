import * as fs from 'fs';
import * as path from 'path';

interface CodeSnippet {
  code: string;
  startLine: number;
  endLine: number;
}

/**
 * Get line number from character index in file content
 */
function getLineNumberFromIndex(fileContent: string, index: number): number {
  return fileContent.substring(0, index).split('\n').length;
}

/**
 * Count leading spaces in a line
 */
function countLeadingSpaces(line: string): number {
  const match = line.match(/^ */);
  return match ? match[0].length : 0;
}

/**
 * Process highlighting directives for a specific identifier.
 * Converts identifier-specific highlighting comments into standard highlighting comments,
 * and removes highlighting for other identifiers.
 */
function processHighlighting(codeSnippet: string, identifier: string): string {
  const lines = codeSnippet.split('\n');

  // Regex patterns for highlighting directives
  const patterns = [
    { regex: /highlight-next-line:([a-zA-Z0-9-._:]+)/, replacement: 'highlight-next-line' },
    { regex: /highlight-start:([a-zA-Z0-9-._:]+)/, replacement: 'highlight-start' },
    { regex: /highlight-end:([a-zA-Z0-9-._:]+)/, replacement: 'highlight-end' },
    { regex: /this-will-error:([a-zA-Z0-9-._:]+)/, replacement: 'this-will-error' },
  ];

  const processLine = (
    line: string,
    regex: RegExp,
    replacement: string
  ): { line: string; mutated: boolean } => {
    const match = line.match(regex);
    let mutated = false;

    if (match) {
      mutated = true;
      const identifiers = match[1].split(':');

      if (identifiers.includes(identifier)) {
        // Replace with standard highlighting comment
        line = line.replace(match[0], replacement);
      } else {
        // Remove the highlighting directive entirely
        line = line.replace(match[0], '');
      }
    }

    return { line, mutated };
  };

  let minIndentation = 200;
  const resultLines: string[] = [];

  for (let line of lines) {
    let wasMutated = false;

    // Process all highlighting patterns
    for (const pattern of patterns) {
      const result = processLine(line, pattern.regex, pattern.replacement);
      line = result.line;
      wasMutated = wasMutated || result.mutated;
    }

    // Remove empty comment lines that resulted from mutation
    const trimmedLine = line.trim();
    if (!(trimmedLine === '' && wasMutated) && !(trimmedLine === '//' || trimmedLine === '#')) {
      resultLines.push(line);

      // Track minimum indentation for later normalization
      const leadingSpaces = countLeadingSpaces(line);
      if (line.length > 0 && leadingSpaces < minIndentation) {
        minIndentation = leadingSpaces;
      }
    }
  }

  // Normalize indentation by removing common leading spaces
  let result = '';
  for (const line of resultLines) {
    const normalizedLine = line.length > minIndentation ? line.substring(minIndentation) : line;
    result += normalizedLine.trimEnd() + '\n';
  }

  return result.trimEnd();
}

/**
 * Extract a code snippet from a source file based on identifier markers.
 * Looks for `docs:start:identifier` and `docs:end:identifier` comments.
 *
 * Supports overlapping identifiers (multiple snippets in the same code section).
 */
export function extractCodeSnippet(filePath: string, identifier: string): CodeSnippet {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const linesToRemove: number[] = [];

  const startRegex = /(?:\/\/|#)\s+docs:start:([a-zA-Z0-9-._:]+)/g;
  const endRegex = /(?:\/\/|#)\s+docs:end:([a-zA-Z0-9-._:]+)/g;

  /**
   * Search for regex matches in the file content and track lines to remove
   */
  const lookForMatch = (regex: RegExp): [RegExpExecArray | null, number | null] => {
    let match: RegExpExecArray | null;
    let matchFound = false;
    let matchedLineNum: number | null = null;
    let actualMatch: RegExpExecArray | null = null;
    const lines = fileContent.split('\n');

    while ((match = regex.exec(fileContent)) !== null) {
      const identifiers = match[1].split(':');
      const isTargetMatch = identifiers.includes(identifier);

      if (!isTargetMatch) {
        // This line is for a different identifier - mark it for removal
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim() === match[0].trim()) {
            linesToRemove.push(i + 1); // lines are 1-indexed
          }
        }
      } else {
        if (matchFound) {
          throw new Error(`Duplicate marker for identifier "${identifier}" in file "${filePath}"`);
        }
        matchFound = true;
        matchedLineNum = getLineNumberFromIndex(fileContent, match.index);
        actualMatch = match;
      }
    }

    return [actualMatch, matchedLineNum];
  };

  const [startMatch, startLineNum] = lookForMatch(startRegex);
  const [endMatch, endLineNum] = lookForMatch(endRegex);

  // Validate that both start and end markers were found
  if (startMatch === null || endMatch === null) {
    if (startMatch === null && endMatch === null) {
      throw new Error(`Identifier "${identifier}" not found in file "${filePath}"`);
    } else if (startMatch === null) {
      throw new Error(`Start marker "docs:start:${identifier}" not found in file "${filePath}"`);
    } else {
      throw new Error(`End marker "docs:end:${identifier}" not found in file "${filePath}"`);
    }
  }

  let lines = fileContent.split('\n');

  // Filter out lines that belong to other identifiers (within our snippet bounds)
  const filteredLinesToRemove = linesToRemove.filter((lineNum) => {
    return lineNum >= startLineNum! && lineNum <= endLineNum!;
  });

  // Remove lines marked for removal
  lines = lines.filter((_, i) => !filteredLinesToRemove.includes(i + 1));

  // Extract only the lines between start and end markers
  const adjustedEndLine = endLineNum! - filteredLinesToRemove.length;
  lines = lines.filter((_, i) => {
    return i + 1 > startLineNum! && i + 1 < adjustedEndLine;
  });

  // Process highlighting directives
  let codeSnippet = lines.join('\n');
  codeSnippet = processHighlighting(codeSnippet, identifier);

  return {
    code: codeSnippet,
    startLine: startLineNum!,
    endLine: endLineNum!,
  };
}

/**
 * Extract code snippet and generate GitHub source link
 */
export function extractCodeWithMetadata(
  rootDir: string,
  codeFilePath: string,
  identifier: string,
  commitTag?: string
): { code: string; sourceLink: string } {
  const absCodeFilePath = path.join(rootDir, codeFilePath);

  const { code, startLine, endLine } = extractCodeSnippet(absCodeFilePath, identifier);

  // Generate GitHub source link
  const tag = commitTag || 'master';
  const urlText = `${codeFilePath}#L${startLine}-L${endLine}`;
  const sourceLink = `https://github.com/AztecProtocol/aztec-packages/blob/${tag}/${urlText}`;

  return { code, sourceLink };
}
