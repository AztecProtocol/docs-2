# Private Messaging

## Mike's notes

- Reiterate Lifecycle concepts:
    - Create, Choose Recipient(s), Encrypt, Emit, Discover, Decrypt, Process, Store, Read, Nullify
1. Message Delivery
    1. Note emission rails
        - Syntax
    2. Event emission rails
        - Syntax
    3. Share what?
    2. Optimisations, to reduce communication costs
    3. Brute-forcing the note nonce
    4. Deriving randomness from an ephemeral secret key
    4. Share with whom?
    4. Sharing with yourself.
    5. Backing-up your private activity
    6. Sharing with a recipient.
    7. Sharing with multiple people.
    5. Share how?
        - See Logs
    6. Encrypt
    6. Choice of Encryption Scheme
2. Message Discovery
    - Brute Force vs Tagging
        - See Mike's section of the Whitepaper for wording.
    - Discovery from Web2
    - Discovery from Logs
    - Explain all the Note syncing code that is relevant to an end user.
    - Advanced
        - Explain code that would be relevant to an advanced user.
        - Compute expected tags
        - Fetch logs for those tags
        - Process the logs
        - Decode the logs
        - Derive symmetric encryption key
        - Decrypt the ciphertexts
        - Decode the plaintext
        - Interpret the data
        - Store the data (events or notes)
        - For notes, check whether the notes have been nullified.
3. Constraining delivery
    - Unconstrained
    - Constrained
    - See Mike's Hackmd on constrained delivery
4. Advanced
    - Establishing an ECDH shared secret
    - Custom log layouts

## Ciara's notes

- This replaces note discovery so we should make that crystal clear