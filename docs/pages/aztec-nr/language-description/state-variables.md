# State Variables

    1. Storage
        - Declaring Contract Storage
            - #[storage]
        - Accessing Contract Storage
            - `storage.thing` ←- subject to change
    2. Public State Variables
        1. PublicMutable
        2. PublicImmutable
        3. delayedPublicMutable
            - Explain and justify, in detail.
    3. Private State Variables
        1. Private State (concepts)
            1. Notes & Nullifiers (concepts)
                1. Notes (concepts)
                    - Lifecycle of a note (concepts)
                        - Create, Choose Recipient(s), Insert (Commit), Encrypt, Emit, Discover, Decrypt, Process, Store, Read, Nullify
                    - Stored in a tree
                2. Nullifiers (concepts)
                    - Stored in a tree
        2. Private State Variables
            - Intro for everything that follows (Justification):
                - Convenient wrappers that manage note structs and their nullifiers:
                - Safe reading & writing of private state
                - Safe nullification
                - Rails for private emission of notes to users
                    - If a Private State Variable gives you a new note, it forces you to consider how you want to share it with other users, through `emit`.
        3. Choosing a Private State variable
            - Quick Ref table
                - Map private state vars to their use cases
        4. Note Structs ←- subject to change (we might remove owner and randomness)
            - Off-the-shelf Note Structs
                - UintNote
                - BearerNote
            - Partial Notes ←- this needs to improved
                - What does a dev need to know about partial notes, in order to use them?
                - How does a dev make their notes "partial"?
            - Advanced: Create a Custom Note Struct
                - Note Traits
                - Choosing a Nullification Scheme
                    - zcash-style
                    - plume-style
                    - project-tachyon-style
        5. How to share the private data with people
            - Explain
        6. PrivateMutable
            - Initialisation dangers
        7. PrivateImmutable
        8. PrivateSet
            - Concept
            - PrivateSet vs Map(PrivateMutable)
        9. delayedPrivateMutable
            - Explain and justify, in detail.
        10. sequentialPrivateMutable
            - Storing state in nullifiers (concepts)
        - Storing custom types
            - E.g. BalanceSet is a custom type. Talk about the traits that need to be implemeted, e.g. `HasStorageSlot`.
        1. Advanced
            - Private State Variable design
                1. Storage Slots
                2. Siloing
                3. Uniqueness
                4. RetrievedNote
    4. Containers
        1. Map ←- considering getting rid of this in private
        2. Array (doesn't exist yet)
    5. Advanced
        1. Manipulating Notes & Nullifiers directly
            - Explain the concepts, then advise strongly against it.
        2. Emulating immutables
            - (Briefly explain that constructor args can also be used)
        3. Authorizing State Changes
            1. Authwits
            2. Auth keypair vs Nullifier keypair
            3. zcash vs plume nullifiers
