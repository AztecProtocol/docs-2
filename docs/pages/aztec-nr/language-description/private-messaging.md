# Private Messaging

- Reiterate Lifecycle concepts:
  - Create, Choose Recipient(s), Encrypt, Emit, Discover, Decrypt, Process, Store, Read, Nullify

1. Message Delivery
   1. Note emission rails
      - Syntax
   2. Event emission rails
      - Syntax
   3. Share what?
   4. Optimisations, to reduce communication costs
   5. Brute-forcing the note nonce
   6. Deriving randomness from an ephemeral secret key
   7. Share with whom?
   8. Sharing with yourself.
   9. Backing-up your private activity
   10. Sharing with a recipient.
   11. Sharing with multiple people.
   12. Share how?
       - See Logs
   13. Encrypt
   14. Choice of Encryption Scheme
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
