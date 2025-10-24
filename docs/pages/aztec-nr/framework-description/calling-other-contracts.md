# Calling Other Contracts

## Mike's comments 

4. Calling other Contracts
    - Contract Address & Function Selector
        - (Noting that function selectors are only part of the protocol for private functions)
    - Importing another Contract's Interface
    - External call to self
        - E.g. recursive token spends
        - Limitations of this syntax (ugly)
    - Call
    - Staticcall
    - Delegatecall
        - It does not exist. Point the user to contract upgrades, in the "deploy" section.
    - Calling Private Getter Functions of other Contracts
        - Restrictions, to prevent private state leakage.
    - Private -> Public Calls
        - Privacy Leakage
        - Avoid Passing Addresses
            - Setting msg_sender to Option::none
            - Stealthifying Addresses
                - Custom Stealth Addresses

## Notes from chat with Mike

- Also include other call types?
