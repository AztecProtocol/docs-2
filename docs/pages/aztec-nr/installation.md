# Installation

Before learning how to create Aztec smart contracts, we must first install some tools we will use in the development process:

- **Aztec Tools**:
  - `aztec`: to manage infrastructure subsystems (sandbox, sequencer, prover, pxe, etc) and provides utility commands to interact with the network
  - `aztec-nargo`: aztec's build of [nargo](https://noir-lang.org/docs/reference/nargo_commands), the noir compiler toolchain.
  - `aztec-postprocess-contract`: post processing tool for Aztec contracts (transpilation and verification key generation).
  - `aztec-up`: to upgrade the aztec toolchain to the latest, or specific versions.
  - `aztec-wallet` - for interacting with the aztec network
- **[Noir Language Support extension](https://marketplace.visualstudio.com/items?itemName=noir-lang.vscode-noir)**: This make it easier to develop Aztec smart contracts, which are written in Noir, by providing syntax highlighting, error detection and go-to definitions.

## Prerequisites

- Node.js version v22.15.x (lts/jod), and backwards compatible from version 20. You can use [nvm](https://github.com/nvm-sh/nvm) to help manage node versions.

- [Docker](https://docs.docker.com/get-docker/)

## Install Aztec Tools

1. Docker needs to be running in order to install the sandbox.

2. To install the above tools, run the following command:

```bash
bash -i <(curl -s https://install.aztec.network)
```

3. Check the tools have installed correctly

```bash
aztec --version
```

## Noir VSCode Extension

<!-- docs:start:installing_noir_lsp -->

Install the [Noir Language Support extension](https://marketplace.visualstudio.com/items?itemName=noir-lang.vscode-noir) to get syntax highlighting, syntax error detection and go-to definitions for your Aztec contracts.

Once the extension is installed, check your nargo binary by hovering over Nargo in the status bar on the bottom right of the application window. Click to choose the path to aztec-nargo (or regular nargo, if you have that installed).

You can print the path of your `aztec-nargo` executable by running:

```bash
which aztec-nargo
```

To specify a custom nargo executable, go to the VSCode settings and search for "noir", or click extension settings on the `noir-lang` LSP plugin. Update the `Noir: Nargo Path` field to point to your desired `aztec-nargo` executable.

<!-- docs:end:installing_noir_lsp -->

## Creating an Aztec.nr Project
