# Navigating the Documentation

These docs are targeted at **Solidity developers** who want to build privacy applications. Since Aztec smart contracts are written in Noir, those familiar with Rust will find the developer experience to be similar since Noir is Rust-based.

The differences between Ethereum development and Aztec development are detailed in these docs but the high-level differences that will need to be understood are:

1. How public and private state is managed.
2. How to write Aztec smart contracts with Noir and Aztec.nr.

### Getting started on Sandbox or Testnet

Get started developing on Aztec by running the sandbox or interacting with testnet.

The differences between sandbox and testnet:

**Sandbox (Local Development)**

- Runs locally on your machine
- No proving by default (faster development)
- No fees
- Instant block times
- Test accounts automatically deployed
- Ideal for rapid development and testing

**Testnet (Remote Network)**

- Remote environment with network of sequencers
- Always has proving enabled (longer transaction times)
- Always has fees enabled (need to pay or sponsor fees)
- ~36 second block times, longer L1 settlement
- No automatic test accounts
- Ideal for production-like testing

### Concepts

### Guides

- Smart contracts
  - Write a counter smart contract
  - Write a token smart contract
  - Write a contract with partial notes
