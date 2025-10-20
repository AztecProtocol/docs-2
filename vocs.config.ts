import { defineConfig } from 'vocs'
import * as path from 'path'
import { remarkIncludeCode } from './src/plugins/remark-include-code'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  title: 'Aztec Docs',
  markdown: {
    remarkPlugins: [
      remarkMath,
      [remarkIncludeCode, {
        rootDir: path.join(__dirname, 'submodules/aztec-packages'),
        commitTag: process.env.COMMIT_TAG
      }]
    ],
    rehypePlugins: [
      rehypeKatex
    ]
  },
  topNav: [
    { text: 'Documentation', link: '/' },
    { text: 'Run a Node', link: '/run-a-node' },
  ],
  sidebar: {
    '/': [
    {
      text: '1. Aztec Overview',
      link: '/',
    },
    {
      text: '2. Getting Started',
      link: '/getting-started',
    },
    {
      text: '3. Aztec vs Ethereum',
      link: '/aztec-nr/aztec-vs-ethereum',
    },
    {
      text: '4. Protocol Architecture',
      link: '/protocol-architecture',
      collapsed: true,
      items: [
        {
          text: '4.1 Overview',
          link: '/protocol-architecture/overview',
        },
        {
          text: '4.2 Addresses & Keys',
          link: '/protocol-architecture/addresses-and-keys',
        },
        {
          text: '4.3 Wallets',
          link: '/protocol-architecture/wallets',
        },
        {
          text: '4.4 Call Types',
          link: '/protocol-architecture/call-types',
        },
        {
          text: '4.6 Transactions',
          link: '/protocol-architecture/transactions',
        },
        {
          text: '4.7 Fees',
          link: '/protocol-architecture/fees',
        },
        {
          text: '4.8 Nullifier Merkle Tree',
          link: '/protocol-architecture/nullifier-merkle-tree',
        },
        {
          text: '4.9 Note Discovery',
          link: '/protocol-architecture/note-discovery',
        },
        {
          text: '4.10 Circuits',
          link: '/protocol-architecture/circuits',
        },
        {
          text: '4.11 Storage Slots',
          link: '/protocol-architecture/storage-slots',
        }
      ],
    },
    {
      text: '5. Aztec.nr',
      collapsed: false,
      items: [
        {
          text: '5.1 Overview',
          link: '/aztec-nr/overview',
        },
        {
          text: '5.2 Introduction to Private Smart Contracts',
          link: '/aztec-nr/introduction-to-private-smart-contracts',
          collapsed: true,
          items: [
            {
              text: '5.2.1 A Simple Aztec Smart Contract',
              link: '/aztec-nr/introduction-to-private-smart-contracts/simple-contract'
            },
            {
              text: '5.2.2 Example Aztec Smart Contracts',
              link: '/aztec-nr/introduction-to-private-smart-contracts/examples'
            }
          ]
        },
        {
          text: '5.3 Installation',
          link: '/aztec-nr/installation',
        },
        {
          text: '5.4 Language Description',
          link: '/aztec-nr/language-description',
          collapsed: true,
          items: [
            {
              text: '5.4.1 Project Structure',
              link: '/aztec-nr/language-description/project-structure'
            },
            {
              text: '5.4.2 Contract Structure',
              link: '/aztec-nr/language-description/contract-structure'
            },
            {
              text: '5.4.3 Declaring a Contract',
              link: '/aztec-nr/language-description/declaring-a-contract'
            },
            {
              text: '5.4.4 Functions',
              link: '/aztec-nr/language-description/functions'
            },
            {
              text: '5.4.5 Calling Other Contracts',
              link: '/aztec-nr/language-description/calling-other-contracts'
            },
            {
              text: '5.4.6 Aztec Attributes',
              link: '/aztec-nr/language-description/aztec-attributes'
            },
            {
              text: '5.4.7 Global Variables',
              link: '/aztec-nr/language-description/global-variables'
            },
            {
              text: '5.4.8 State Variables',
              link: '/aztec-nr/language-description/state-variables'
            },
            {
              text: '5.4.9 Events and Logs',
              link: '/aztec-nr/language-description/events-and-logs'
            },
            {
              text: '5.4.10 Private Messaging',
              link: '/aztec-nr/language-description/private-messaging'
            },
            {
              text: '5.4.11 L1<>L2 Messaging',
              link: '/aztec-nr/language-description/l1-l2-messaging'
            },
            {
              text: '5.4.12 Cross-chain Interactions',
              link: '/aztec-nr/language-description/cross-chain-interactions'
            },
            {
              text: '5.4.13 Macros',
              link: '/aztec-nr/language-description/macros'
            },
            {
              text: '5.4.14 Protocol Oracles',
              link: '/aztec-nr/language-description/protocol-oracles'
            },
            {
              text: '5.4.15 Libraries',
              link: '/aztec-nr/language-description/libraries'
            },
            {
              text: '5.4.16 Upgradeable Contracts',
              link: '/aztec-nr/language-description/upgradeable-contracts'
            },
            {
              text: '5.4.17 Error Handling',
              link: '/aztec-nr/language-description/error-handling'
            },
            {
              text: '5.4.18 CoSnarks',
              link: '/aztec-nr/language-description/cosnarks'
            },
            {
              text: '5.4.19 Authentication Witness',
              link: '/aztec-nr/language-description/authentication-witness'
            }
          ]
        },
        {
          text: '5.5 Compiling',
          link: '/aztec-nr/compile',
        },
        {
          text: '5.6 Testing',
          link: '/aztec-nr/testing',
        },
        {
          text: '5.7 Debugging',
          link: '/aztec-nr/debugging',
        },
        {
          text: '5.8 Deploying',
          link: '/aztec-nr/deploying',
        },
        {
          text: '5.9 Advanced Features',
          link: '/aztec-nr/advanced-features',
          collapsed: true,
          items: [
            {
              text: '5.9.1 Custom Notes',
              link: '/aztec-nr/advanced-features/custom-notes'
            }
          ]
        },
        {
          text: '5.10 Common Patterns',
          link: '/aztec-nr/common-patterns',
        },
        {
          text: '5.11 Optimizations, Gas and Profiling',
          link: '/aztec-nr/optimizations-and-gas',
          collapsed: true,
          items: [
            {
              text: '5.11.1 Gas',
              link: '/aztec-nr/optimizations-and-gas/gas'
            },
            {
              text: '5.11.1 Profiling',
              link: '/aztec-nr/optimizations-and-gas/profiling'
            },
            {
              text: '5.11.2 Optimizing Functions',
              link: '/aztec-nr/optimizations-and-gas/optimizing-functions'
            },
            {
              text: '5.11.4 Chosing Numeric Types',
              link: '/aztec-nr/optimizations-and-gas/numeric-types'
            }
          ]
        },
        {
          text: '5.12 Protocol Upgrades',
          link: '/aztec-nr/protocol-upgrades',
        },
        {
          text: '5.13 Reference',
          link: '/aztec-nr/reference',
        },
      ],
    },
    {
      text: '6. Aztec.js',
      collapsed: false,
      items: [
        {
          text: '6.1 Overview',
          link: '/aztec-js/overview',
        },
        {
          text: '6.2 Getting Started',
          link: '/aztec-js/getting-started',
        },
        {
          text: '6.3 Reference',
          link: '/aztec-js/reference',
        },
      ],
    },
    {
      text: '7. Aztec Nargo',
      collapsed: false,
      items: [
        {
          text: '7.1 Overview',
          link: '/aztec-nargo/overview',
        },
        {
          text: '7.2 Getting Started',
          link: '/aztec-nargo/getting-started',
        },
        {
          text: '7.3 Reference',
          link: '/aztec-nargo/reference',
        },
      ],
    },
    {
      text: '8. Aztec CLI',
      collapsed: false,
      items: [
        {
          text: '8.1 Overview',
          link: '/aztec-cli/overview',
        },
        {
          text: '8.2 Getting Started',
          link: '/aztec-cli/getting-started',
        },
        {
          text: '8.3 Reference',
          link: '/aztec-cli/reference',
        },
      ],
    },
    {
      text: '9. Wallet CLI',
      collapsed: false,
      items: [
        {
          text: '9.1 Overview',
          link: '/wallet-cli/overview',
        },
        {
          text: '9.2 Getting Started',
          link: '/wallet-cli/getting-started',
        },
        {
          text: '9.3 Reference',
          link: '/wallet-cli/reference',
        },
      ],
    },
    {
      text: '10. Resources',
      items: [
        {
          text: 'Glossary',
          link: '/glossary',
        },
      ],
    },
    ],
    '/run-a-node': [
      {
        text: '1. Overview',
        link: '/run-a-node',
      },
      {
        text: '2. Getting Started',
        link: '/run-a-node/getting-started',
      },
      {
        text: '3. Guides',
        collapsed: false,
        items: [
          {
            text: '3.1 Run a Sequencer',
            link: '/run-a-node/guides/run-a-sequencer',
          },
          {
            text: '3.2 Run a Prover',
            link: '/run-a-node/guides/run-a-prover',
          },
        ],
      },
      {
        text: '4. Reference',
        collapsed: false,
        items: [
          {
            text: '4.1 Governance and Proposals',
            link: '/run-a-node/reference/governance-and-proposals',
          },
          {
            text: '4.2 FAQs',
            link: '/run-a-node/reference/faqs',
          },
          {
            text: '4.3 Commands',
            link: '/run-a-node/reference/commands',
          },
          {
            text: '4.4 CLI Reference',
            link: '/run-a-node/reference/cli-reference',
          },
        ],
      },
    ],
  },
})
