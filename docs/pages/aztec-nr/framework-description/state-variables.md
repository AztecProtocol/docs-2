# State Variables

a contract's state is defined by multiple values, e.g. in a token it'd be the total supply, user balances, outstanding approvals, accounts with minting permission, etc. each of these persisting values is called a _state variable_.

one of the first design considerations for any smart contract is how it'll store its state. this is doubly true in aztec due to there being both public and private state - the tradeoff space is large, so there's room for lots of decisions.

## The Storage Struct

state variables are declared in solidity by simply listing them inside of the contract, like so:

```solidity
contract MyContract {
    uint128 public my_public_state_variable;
}
```

in aztecnr we instead define a `struct` <link to noir structs> that holds all state variables. we call this struct **the storage struct**, and it is identified by having the `#[storage]` macro <link to storage api ref> applied to it.

```noir
use aztec::macros::aztec;

#[aztec]
contract MyContract {
    use aztec::macros::storage;

    #[storage]
    struct Storage<C> {
        // state variables go here
    }
}
```

The storage struct can have any name, but it is typically just called `Storage`. this struct must also have a generic type called C or Context - this is unfortunate boilerplate (link to api ref where we explain _why_ this must exist and what it means - which we don't think is something users need to know about, but some might be curious).

>all contract state must be in a single struct. the #[storage] macro can only be used once

### Accessing Storage

the contract's storage is accessed via `self.storage` in any contract function. it will automatically be tailored to the execution context of that function, hiding all methods that cannot be invoked there.

consider for example a PublicMutable state variable, which is a value that is fully accessible in public functions, but which cannot be read or written in a private function, and which can only be in utility functions

```rust
#[storage]
struct Storage<C> {
    my_public_variable: PublicMutable<u128, C>,
}

#[external("public")]
fn my_public_function() {
    let current = self.storage.my_public_variable.read();
    self.storage.my_public_variable.write(current + 1);
}

#[external("private")]
fn my_private_function() {
    let current = self.storage.my_public_variable.read(); // compilation error - 'read' is not available in private
    self.storage.my_public_variable.write(current + 1); // compilation error - 'write' is not available in private
}

#[external("utility")]
fn my_utility_function() {
    let current = self.storage.my_public_variable.read();
    self.storage.my_public_variable.write(current + 1); // compilation error - 'write' is not available in utility
}
```

### Storage Slots

each state variable gets assigned a different_storage slot_, a numerical value. They they are used depends on the kind of state variable: for public state variables they are related to slots in the public data tree, and for private state variables they are metadata that gets included in the note hash. The purpose of slots is the same for both domains however: they keep the values of different state values _separate_ so that they do not interfere with one another.

storage slots are a low level detail that users don't typically need to concern themselves with. they are automatically allocated to each state variable by aztecnr and don't require any kind of manual intervention. indeed, utilizing storage slots directly can be dangerous as it may accidentally result in data collisions across state variables, or invariants being broken.

in some advanced use cases however it can be useful to have access to these low-level details (link to api ref on storage slot stuff), such as when implementing contract upgrades (link to docs) or when interacting with protocol contracts (link).

### The `Packable` trait

## Public State Variables

these are state variables that have _public_ content, that is, everyone on the network can see the values they store. they are pretty much equivalent to Solidity state variables.

### Choosing a Public State Variable

because they reside in the network's public storage tree (link to foundational concepts), they can only be written to by public contract functions. it is possible to read _past_ values of a public state variable in a private contract function, but the current values of the network's public state tree are not accessible in those.

| state variable | mutable? | readable in private? | writable in private? | example use case |
| - | - | - | - | - |
| `PublicMutable` | yes | no| no | configuration of admins, global state (e.g. token total supply, total votes) |
| `PublicImmutable` | no | yes | no | fixed configuration, one-way actions (e.g. initialization settings for a proposal) |
| `DelayedPublicMutable` | yes (after a delay) | yes | no | non time sensitive system configuration |

(make the table have links to sections)

### Public Mutable (link to apiref)

This is the simplest kind of public state variable: a value that can be read and written. It is essentially the same as a non-`immutable` Solidity state variable.

It cannot be read or written to privately, but it is possible to call private functions that enqueue a public call (link) in which a `PublicMutable` is accessed. For example, a voting contract may allow private submission of votes which then enqueue a public call in which the vote count, represented as a `PublicMutable<u128>`, is incremented. This would let anyone see how many votes have been cast, while preserving the privacy of the account that cast the vote.

### Public Immutable (link to apiref)

This is a simplified version `PublicMutable`: it's a public state variable that can only be written (initialized) once, at which point it can only be read. Unlike Solidity `immutable` state variables, which must be set in the contract's constructor, a `PublicImmutable` can be initialized _at any point in time_ during the contract's lifecycle - attempts to read it prior to initialization will revert.

Due to the value being immutable, it is also possible to read it during private execution - once a circuit proves that the value was set in the past, it knows it cannot have possibly changed. This makes this state variable suitable for immutable public contract configuration or one-off public actions, such as whether a user has signed up or not.

### Delayed Public Mutable (link to apiref)

it is sometimes quite problematic to be unable to read public mutable state in private. for example, a decentralized exchange might have a configurable swap fee that some admin sets, but which needs to be read by users in their private swaps. this is where `DelayedPublicMutable` comes in.

Delayed Public Mutable is the same as a Public Mutable in that it is a public value that can be read and written, but with a caveat: writes only take effect _after some time delay_. these delays are configurable, but they're typically on the order of a couple hours, if not days, making this state variable unsuitable for actions that must be executed immediately - shut us an emergency shut down. it is these very delays however that enable private contract functions to _read the current value of a public state variable_, which is otherwise typically impossible. 

the existence of minimum delays means that a private function that reads a public value at an anchor block has a guarantee that said historical value will remain the current value until _at least_ some time in the future - before the delay elapses. as long as the transaction gets included in a block before that time (link to the `include_by_timestamp` tx property), the read value is valid.

## Private State Variables

these are state variables that have _private_ content, that is, only some people know what is stored in them. these work very differently from public state variables and are unlike anything in languages such as Solidity, since they are built from fundamentally different primitives (notes and nullifiers instead of a key-value updatable public database).

understanding these primitives and how they can be used is key to understanding how private state works.

(table comparing private set and private mutable? not sure what the columns would be)

### Notes and Nullifiers

Just as public state is stored in a single public data tree (equivalent to the key-value store that is contract storage on the EVM), private state is stored in two separate trees that have different properties: the note hash tree and the nullifier tree

#### Notes

notes are user-defined data this meant to be stored privately on the blockchain. a note can represent an amount (e.g. some token balance), an id (e.g. a vote proposal id), an address (e.g. an authorized account), or any kind of private piece of data. 

they also have some metadata, including a storage slot to avoid collisions with other notes (link above), a 'randomness' value that helps hide the content, and an owner who can nullify the note (more on this later).

the note content plus metadata are all hashed together, and it is this hash that gets stored onchain in the note hash tree. the underlying note content (the note hash preimage) is not stored anywhere, and so third parties cannot access it and it remains private. the rightful owner will however be able to use the note in the future by producing the hidden content and showing that its hash is stored onchain as part of a zero-knowledge proof - this is typically referred to as 'reading a note'.

>note: aztecnr comes with some prebuilt note types, like `UintNote` and `AddressNote`, but users are also free to create their own with the `#[note]` macro. (links)

##### Note Discovery

because notes are private, not even the intended recipient is aware of their existence, and they must be somehow notified. for example, when making a payment and creating a note for the payee with the intended amount, they must be shown the preimage of the note that was inserted in the note hash tree in a given transaction in order to acknowledge the payment. 

recipients learning about notes created for them is known as 'note discovery', which is a process aztecnr handles efficiently automatically. it does mean however that when a note is created, a _message_ with the content of note is created and needs to be delivered to a recipient via one of multiple means (link to messages).

##### Note Lifecycle

notes are more complicated than regular public state, and so it helps to see the different stages one goes through, and when and where each happens.

- creation: an account executing a private contract function creates a new note according to contract logic, e.g. transferring tokens to a recipient. note values (e.g. the token amount) and metadata are set, and the note hash computed and inserted as one of the effects of the transaction (link to protocol docs - tx effects).

- encryption: the content of the note is encrypted with a key only the sender and intended recipient know - no other account can decrypt this message. (link to message layout, how we do secret sharing and encryption)

- delivery: the encrypted message is delivered to the recipient via some means. options include storing it onchain as a transaction log, or sending it offchain e.g. via email or by having the recipient scan a QR code on the sender's device. (link to delivery details and options)

- insertion: the transaction is sent to the network and gets included in a block. the note hash is inserted into the note hash tree - this is visible to the entire network, but the content of the note remains private. (link to protocol details - note hash tree insertion and tx effects)

- discovery: the recipient processes the encrypted message they were sent, decrypting it and finding the note's content (i.e. the hash preimage). they verify that the note's hash exists on chain in the note hash tree. they store the note's content in their own private database, and can now spend the note. (link to message discovery and processing)

- reading: while executing  private contract function, the recipient fetches the note's content and metadata from their private database and shows that its hash exists in the note hash tree as part of the zero-knowledge proof. 

- nullification: the recipient computes the note's nullifier and inserts it as one of the effects of the transaction (link to prot docs tx effects), preventing the note from being read again.

#### Nullifiers

the nullifier tree is append-only - if it wasn't, when a note was spent then external observers would notice that the tree leaf inserted in some transaction was modified in a second transaction, therefore linking them together and leaking privacy. it would for example mean that when a user made a payment to a third party, they'd be able to know when the recipient spent the received funds. nullifiers exist to solve the above issue.

a nullifier is a value which indicates a resource has been spent. nullifiers are unique, and the protocol forbids the same nullifier from being inserted into the tree twice. spending the same resource therefore results in a duplicate nullifier, which invalidates the transaction.

most often, nullifiers are used to mark a note as being spent, which prevents note double spends. this requires two properties from the function that computes a note's nullifier:
- determinism: the nullifier **must** be deterministic given a note, so that the same nullifier value is computed every time the note is attempted to be spent. A non-deterministic nullifier would result in a note being spendable more than once because the nullifiers would not be duplicates.
- secret: the nullifier **must** not be computable by anyone except the owner, _even by someone that knows the full note content_. This is because some third parties _do_ know the note content: when paying someone and creating a note for them, the payer creates the note on their device and thus has access to all of its data and metadata.

there are multiple ways to compute nullifiers that fulfill this property, but the most widely used one is to have the nullifier be a hash of the note contents concatenated with a private key of the note's owner (link to account keys). These values are immutable, and only the owner knows their private keys, and so both determinism and secrecy are achieved. These nullifiers are sometimes called 'zcash-style nullifiers', because this is the format ZCash uses for theirs.

### How aztec-nr Abstracts Private State Variables

and mentioned in notes and nullifiers (link), implementing a private state variable requires careful coordination of multiple primitives and concepts (creating notes, encrypting, delivering, discovering and processing messages, reading notes and computing their nullifiers). aztec-nr provides convenient types and functions that handle all of these low level details in order to allow developers to write safe code without having to understand the nitty-gritty.

by applying the `#[note]` macro to a noir struct, users can define values that will be storable in notes (link to macro docs. also this is a bit of a lie right now, notes also need an owner and randomness, but they soon wont). private state variables can then hold these notes and be used to read, write, and deliver note messages to the intended recipient.

>advanced users can change this default behavior by either defining their own custom note hash and nullifier functions (link to custom notes), implementing their own state variables (link), or even accessing the note hash and nullifiers tree directly (link).

the snippet below shows a contract with two private state variables: an admin address (stored in an `AddressNote`) and a counter of how many calls the admin has made (stored in a `UintNote`). These values will be private and therefore not known except by the accounts that own these notes (the admin). In the `perform_admin_action` private function, the contract checks that it is being called by the correct admin and updates the call count by incrementing it by one.

(this is not a real snippet, it's missing some small irrelevant details - but the gist of it is correct)

```rust
#[note]
struct AddressNote {
    value: AztecAddress,
}

#[note]
struct UintNote {
    value: u128,
}

#[storage]
struct Storage {
    admin: PrivateImmutable<AddressNote>,
    admin_call_count: PrivateMutable<UintNote>,
}

#[external("private")]
fn perform_admin_action() {
    // Read the contract's admin address and check against the caller
    let admin = self.storage.admin.read().value;
    assert(self.msg_sender() == admin);

    // Update the call count by replacing (updating - rename soon) the current note with a new one that equals the
    // current value + 1 - this requires knowing what the current value is in the first place, i.e. reading the variable.
    //
    // We then deliver the encrypted message with the note's content to the admin, so that they become aware of the new
    // value of the counter and can update it again in the future.
    self.storage.admin_call_count
        .replace(|current| UintNote{ value: current.value + 1 }) // wouldn't it be great if we didn't have to deal with this wrapping and unwrapping?
        .deliver(admin);

    ...
}
```

### Choosing a Private State Variable

<!-- 
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
        5. How to share the private data with people (maybe link to private messaging doc)
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
            3. zcash vs plume nullifiers -->