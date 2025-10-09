import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Aztec Docs',
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
      text: '3. Concepts',
      link: '/concepts',
    },
    {
      text: '4. Guides',
      collapsed: false,
      items: [
        {
          text: '4.1 Smart Contracts',
          items: [
            {
              text: '4.1.1 Counter Contract',
              link: '/guides/smart-contracts/counter-contract',
            },
            {
              text: '4.1.2 Token Contract',
              link: '/guides/smart-contracts/token-contract',
            },
            {
              text: '4.1.3 Private Payments',
              link: '/guides/smart-contracts/private-payments',
            },
          ],
        },
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
          text: '5.2 Getting Started',
          link: '/aztec-nr/getting-started',
        },
        {
          text: '5.3 Reference',
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
