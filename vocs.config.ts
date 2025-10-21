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
      text: '4. Foundational Topics',
      link: '/foundational-topics',
      collapsed: false,
      items: [
        {
          text: '4.1 Overview',
          link: '/foundational-topics/overview',
        },
        {
          text: '4.2 Addresses, Accounts & Keys',
          link: '/foundational-topics/addresses-accounts-and-keys',
        },
        {
          text: '4.3 Storage',
          link: '/foundational-topics/storage',
        },
        {
          text: '4.4 Storage Slots',
          link: '/foundational-topics/storage-slots',
        },
        {
          text: '4.5 Transactions',
          link: '/foundational-topics/transactions',
        },
        {
          text: '4.6 Fees',
          link: '/foundational-topics/fees',
        },
        {
          text: '4.7 Wallets',
          link: '/foundational-topics/wallets',
        },
        {
          text: '4.8 Call Types',
          link: '/foundational-topics/call-types',
        },
        {
          text: '4.9 Nullifier Merkle Tree',
          link: '/foundational-topics/nullifier-merkle-tree',
        },
        {
          text: '4.10 Note Discovery',
          link: '/foundational-topics/note-discovery',
        },
        {
          text: '4.11 Circuits',
          link: '/foundational-topics/circuits',
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
          text: '5.4 Framework Description',
          link: '/aztec-nr/framework-description',
          collapsed: true,
          items: [
            {
              text: '5.4.1 Project Structure',
              link: '/aztec-nr/framework-description/project-structure'
            },
            {
              text: '5.4.2 Contract Structure',
              link: '/aztec-nr/framework-description/contract-structure'
            },
            {
              text: '5.4.3 Declaring a Contract',
              link: '/aztec-nr/framework-description/declaring-a-contract'
            },
            {
              text: '5.4.4 Functions',
              link: '/aztec-nr/framework-description/functions'
            },
            {
              text: '5.4.5 Calling Other Contracts',
              link: '/aztec-nr/framework-description/calling-other-contracts'
            },
            {
              text: '5.4.6 Aztec Attributes',
              link: '/aztec-nr/framework-description/aztec-attributes'
            },
            {
              text: '5.4.7 Global Variables',
              link: '/aztec-nr/framework-description/global-variables'
            },
            {
              text: '5.4.8 State Variables',
              link: '/aztec-nr/framework-description/state-variables'
            },
            {
              text: '5.4.9 Events and Logs',
              link: '/aztec-nr/framework-description/events-and-logs'
            },
            {
              text: '5.4.10 Private Messaging',
              link: '/aztec-nr/framework-description/private-messaging'
            },
            {
              text: '5.4.11 L1<>L2 Messaging',
              link: '/aztec-nr/framework-description/l1-l2-messaging'
            },
            {
              text: '5.4.12 Cross-chain Interactions',
              link: '/aztec-nr/framework-description/cross-chain-interactions'
            },
            {
              text: '5.4.13 Authentication Witness',
              link: '/aztec-nr/framework-description/authentication-witness'
            },
            {
              text: '5.4.14 Protocol Oracles',
              link: '/aztec-nr/framework-description/protocol-oracles'
            },
            {
              text: '5.4.15 Libraries',
              link: '/aztec-nr/framework-description/libraries'
            },
            {
              text: '5.4.16 Upgradeable Contracts',
              link: '/aztec-nr/framework-description/upgradeable-contracts'
            },
            {
              text: '5.4.17 Error Handling',
              link: '/aztec-nr/framework-description/error-handling'
            },
            {
              text: '5.4.18 CoSnarks',
              link: '/aztec-nr/framework-description/cosnarks'
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
              text: '5.11.2 Profiling',
              link: '/aztec-nr/optimizations-and-gas/profiling'
            },
            {
              text: '5.11.3 Optimizing Functions',
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
          text: '6.3 Installation',
          link: '/aztec-js/getting-started/installation',
        },
        {
          text: '6.4 Creating Accounts',
          link: '/aztec-js/getting-started/creating-accounts',
        },
        {
          text: '6.5 Deploying Contracts',
          link: '/aztec-js/getting-started/deploying-contracts',
        },
        {
          text: '6.6 Sending Transactions',
          link: '/aztec-js/getting-started/sending-transactions',
        },
        {
          text: '6.7 Simulating Transactions',
          link: '/aztec-js/getting-started/simulating-transactions',
        },
        {
          text: '6.8 Using Authorizing Other Accounts',
          link: '/aztec-js/getting-started/using-authorizing-other-accounts',
        },
        {
          text: '6.9 Paying Fees',
          link: '/aztec-js/getting-started/paying-fees',
        },
        {
          text: '6.10 Testing Contracts',
          link: '/aztec-js/getting-started/testing-contracts',
        },
        {
          text: '6.11 Reference',
          link: '/aztec-js/reference',
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
