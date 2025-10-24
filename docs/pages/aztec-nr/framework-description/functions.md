# Functions

## Mike's notes

3. Functions
    1. Public, Private, Utility
        - Concepts
            - Public functions
                - Are executed by proposers.
                - Executed within an AVM.
                - Public state is manipulated in real time, one tx after another.
            - Private logic
                - Are executed by the user, async.
                - Executed within circuits.
                - Notes & Nullifiers state model (very brief)
            - Utility logic
                - Are executed by the user, async.
                - Executed with Brillig instructions.
                - No tx is proven or sent to the network.
    2. Context
    2. PublicContext
    3. PrivateContext
    4. UtilityContext
    3. Initializer functions (like a solidity constructor)]
        - Explain them
        - Multiple Initializers
        - Some functions can be called before "Initialization".
    4. Public Functions
        - Declaration
            - Valid Attributes (see attributes section)
                - public, view, internal, ... ←- these are about to change
                - #[external(public)] #[internal(public)]
            - Fields
                - Max ~16,000
            - Return Values
    5. Private Functions
        - Declaration
            - Valid Attributes (see attributes section)
                - public, view, internal, ... ←- subject to change
                - #[external(private)] #[internal(private)]
            - Args
            - Return Values
            - Advanced:
                - Args get hashed. Costs constraints.
                - Other ways to pass data into a private function:
                    - Args can be passed via databus? Or did we never implement that?
                    - Capsules (discuss in detail later)
                    - Authwit (discussed in detail in a later section on authorizing state changes)
                    - Oracles (discussed in detail later)
    6. Utility Functions
        - Declaration
            - Valid Attributes (see attributes section)
                - public, view, internal, ...
            - Args
            - Return Values