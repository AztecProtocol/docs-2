# Upgrabeable Contracts

## Mike's notes

1. Immutability vs Upgradeability - tradeoffs
2. Risks of Upgrading
    - Storage slot contamination
    - Bricking of state / notes
    - Upgades are not immediate
        - They're necessarily delayed.
        - Don't rely on them to beat an attacker in a race.
3. Upgrade
    - Give details of the `upgrade` function in the ContractInstancePublisher