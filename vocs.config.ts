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
      link: '/aztec-vs-ethereum',
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
          text: '4.2 Transactions',
          link: '/foundational-topics/transactions',
        },
        {
          text: '4.4 State Management',
          link: '/foundational-topics/state-management',
        },
        {
          text: '4.3 Addresses, Accounts & Keys',
          link: '/foundational-topics/addresses-accounts-and-keys',
        },
        {
          text: '4.7 Wallets',
          link: '/foundational-topics/wallets',
        },
        {
          text: '4.6 Fees',
          link: '/foundational-topics/fees',
        }
      ],
    },
    {
      text: '5. Tutorials',
      collapsed: false,
      items: [
        {
          text: '5.1 Counter Smart Contract',
          link: '/tutorials/counter-smart-contract',
        },
        {
          text: '5.2 Private Token Smart Contract',
          link: '/tutorials/private-token-smart-contract',
        },
        {
          text: '5.3 Token Bridge',
          link: '/tutorials/token-bridge',
        }
      ]
    },
    {
      text: '6. Aztec.nr',
      collapsed: false,
      items: [
        {
          text: '6.1 Overview',
          link: '/aztec-nr/overview',
        },
        {
          text: '6.2 Introduction to Private Smart Contracts',
          link: '/aztec-nr/introduction-to-private-smart-contracts',
          collapsed: true,
          items: [
            {
              text: '6.2.1 Private Token Contract',
              link: '/aztec-nr/introduction-to-private-smart-contracts/private-token-contract'
            },
            {
              text: '6.2.2 Account Contract',
              link: '/aztec-nr/introduction-to-private-smart-contracts/account-contract'
            }
          ]
        },
        {
          text: '6.3 Installation',
          link: '/aztec-nr/installation',
        },
        {
          text: '6.4 Framework Description',
          link: '/aztec-nr/framework-description',
          collapsed: true,
          items: [
            {
              text: '6.4.1 Project Structure',
              link: '/aztec-nr/framework-description/project-structure'
            },
            {
              text: '6.4.2 Contract Structure',
              link: '/aztec-nr/framework-description/contract-structure'
            },
            {
              text: '6.4.3 Declaring a Contract',
              link: '/aztec-nr/framework-description/declaring-a-contract'
            },
            {
              text: '6.4.4 Functions',
              link: '/aztec-nr/framework-description/functions'
            },
            {
              text: '6.4.5 Calling Other Contracts',
              link: '/aztec-nr/framework-description/calling-other-contracts'
            },
            {
              text: '6.4.6 Aztec Attributes',
              link: '/aztec-nr/framework-description/aztec-attributes'
            },
            {
              text: '6.4.7 Global Variables',
              link: '/aztec-nr/framework-description/global-variables'
            },
            {
              text: '6.4.8 State Variables',
              link: '/aztec-nr/framework-description/state-variables'
            },
            {
              text: '6.4.9 Events and Logs',
              link: '/aztec-nr/framework-description/events-and-logs'
            },
            {
              text: '6.4.10 Private Messaging',
              link: '/aztec-nr/framework-description/private-messaging'
            },
            {
              text: '6.4.15 Libraries',
              link: '/aztec-nr/framework-description/libraries'
            },
            {
              text: '6.4.11 Ethereum<>Aztec Messaging',
              link: '/aztec-nr/framework-description/ethereum-aztec-messaging'
            },
            {
              text: '6.4.12 Cross-chain Interactions',
              link: '/aztec-nr/framework-description/cross-chain-interactions'
            },
            {
              text: '6.4.13 Authentication Witness',
              link: '/aztec-nr/framework-description/authentication-witness'
            },
            {
              text: '6.4.16 Upgradeable Contracts',
              link: '/aztec-nr/framework-description/upgradeable-contracts'
            },
            {
              text: '6.4.14 Protocol Oracles',
              link: '/aztec-nr/framework-description/protocol-oracles'
            },
            {
              text: '6.4.18 CoSnarks: Shared Private State',
              link: '/aztec-nr/framework-description/cosnarks'
            },
            {
              text: '6.4.17 Error Handling',
              link: '/aztec-nr/framework-description/error-handling'
            }
          ]
        },
        {
          text: '6.5 Compiling',
          link: '/aztec-nr/compile',
        },
        {
          text: '6.6 Testing',
          link: '/aztec-nr/testing',
        },
        {
          text: '6.7 Debugging',
          link: '/aztec-nr/debugging',
        },
        {
          text: '6.8 Deploying',
          link: '/aztec-nr/deploying',
        },
        {
          text: '6.9 Common Patterns',
          link: '/aztec-nr/common-patterns',
        },
        {
          text: '6.10 Optimizations, Gas and Profiling',
          link: '/aztec-nr/optimizations-and-gas',
          collapsed: true,
          items: [
            {
              text: '6.10.1 Gas',
              link: '/aztec-nr/optimizations-and-gas/gas'
            },
            {
              text: '6.10.2 Profiling',
              link: '/aztec-nr/optimizations-and-gas/profiling'
            },
            {
              text: '6.10.3 Optimizing Functions',
              link: '/aztec-nr/optimizations-and-gas/optimizing-functions'
            },
            {
              text: '6.10.4 Chosing Numeric Types',
              link: '/aztec-nr/optimizations-and-gas/numeric-types'
            }
          ]
        },
        {
          text: '6.11 Protocol Upgrades',
          link: '/aztec-nr/protocol-upgrades',
        },
        {
          text: '6.12 Reference',
          link: '/aztec-nr/reference',
        },
      ],
    },
    {
      text: '7. Aztec.js',
      collapsed: false,
      items: [
        {
          text: '7.1 Overview',
          link: '/aztec-js/overview',
        },
        {
          text: '7.2 Installation',
          link: '/aztec-js/installation',
        },
        {
          text: '7.3 Creating Accounts',
          link: '/aztec-js/creating-accounts',
        },
        {
          text: '7.4 Deploying Contracts',
          link: '/aztec-js/deploying-contracts',
        },
        {
          text: '7.5 Sending Transactions',
          link: '/aztec-js/sending-transactions',
        },
        {
          text: '7.6 Simulating Transactions',
          link: '/aztec-js/simulating-transactions',
        },
        {
          text: '7.7 Using Authorizing Other Accounts',
          link: '/aztec-js/using-authorizing-other-accounts',
        },
        {
          text: '7.8 Paying Fees',
          link: '/aztec-js/paying-fees',
        },
        {
          text: '7.9 Testing Contracts',
          link: '/aztec-js/testing-contracts',
        },
        {
          text: '7.10 Reference',
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
          {
            text: '4.9 Nullifier Merkle Tree',
            link: '/foundational-topics/nullifier-merkle-tree',
          }
        ],
      },
    ],
  },
})
