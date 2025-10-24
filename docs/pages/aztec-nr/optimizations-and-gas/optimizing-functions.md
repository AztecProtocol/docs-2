# Optimizing Functions 

## Mike's notes

## Private vs Public vs Utility vs Another Language (vs Unconstrained!!!)
    - The approaches to optimising are different.
    - Utility vs Unconstrained vs Another Language
        - Tradeoffs.
        - "Another Language" meaning "Typescript" and feeding the data in.

## Private Function Optimisations
    - Reducing proving time
        - Does it need to be constrained?
            - E.g. unconstrained message delivery
        - Link to Noir gate golfing patterns
        - Use Unconstrained Functions
            - Unconstrained Optimisations
                - Don't call lots of little unconstrained functions: Save calls up and make one big call.
                - Returning data from an unconstrained function *does cost constraints* to range-check them.
        - Minimise contract-to-contract calls.
        - Bundle data into 1 note or public slot, using `WithHash` (makes reads cheaper)
        - Use a cheaper hash function (poseidon2 vs pedersen vs sha256 vs keccak)
    - Reducing $ costs
        - Don't use blob DA (see Logs earlier)
        - Deliver offchain, if delivery doesn't need to be constrained.
        - Verify (within the circuit) that the proof has already been delivered.
        - (See above) Bundle data into 1 note or public slot, using `WithHash` (makes writes cheaper too)

## Public Function Optimisations
    - Similar to Ethereum, except the gas costs are very different. See gas tables above.
    - Unconstrained functions do not make efficient public functions.
        - Unconstrained removes loads of constraints from a private function, but the resulting unconstrained function is usually much heavier in computation. If you take an unconstrained function and call it in a PublicContext, the chances are it will eat way more gas than a specifically-optimised-for-public version of the function.
    - Utility functions do not necessarily make efficient public functions.
    - Bytecode size optimisation
        - Publishing the bytecode costs money.
            - Public bytecode must be broadcast, to be executable.
        - The size of bytecode affects AVM execution time, which costs L2 gas.
            - (I might be wrong about this)

## Utility Function Optimisations
    - Bytecode size optimisation
    - The closest to "traditional" computer program optimisation.