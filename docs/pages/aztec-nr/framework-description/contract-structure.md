# Contract Structure

high level structure of how contracts are written and what they're made of

(i am not sure if there should be links throughout this page to the different relevant sections, eg state vars, events, functions, etc., or if we should just do the entire thing in one go with much more detail. i am writing this as if you had never seen a contract in your life and needed to get a sense of how the thing sort of looks to wrap your head around it. there'd be some minor content duplication between this page and the dedicated page in that case - i think that's fine)

## contract block

all contracts begin the same:

```noir
// import the `aztec` macro from aztecnr
use aztec::macros::aztec;

// use the 'contract' keyword to declare a contract, applying the `aztec` macro
#[aztec]
contract MyContract {
    // contract code here
}
```

the `#[aztec]` macro performs a lot of the low-level operations required to take a circuit language like Noir and build smart contracts out of it - including things like automatically creating external interfaces, inserting standard contract functions, etc. all aztec smart contracts must have this macro applied to them.

>note: each noir crate (package) can only have _a single_ contract. if you are writing a multi-contract system, then each of them needs to be in their own separate crate. <link to docs on noir crates and workspaces>

## Imports

except for the `#[aztec]` macro import, all other imports need to go _inside_ the `contract` block - this is because `contract` acts like `mod`, creating a new module <link to noir modules>.

```noir
use aztec::macros::aztec;

#[aztec]
contract MyContract {
    // other imports go here
    use aztec::state_vars::{PrivateMutable, PrivateSet};
}
```

>note: noir's vscode extension is able to take care of most imports and put them in the correct place automatically

## State Variables

with the boilerplate out of the way, it is now the time to begin defining the contract logic. it is recommended to start development by understanding the shape the _state_ of the contract will have: which values will be private, which will be public, and what properties are required (is mutability or immutability needed? is there a single global value, like a token total supply, or does each user get one, like a balance?).

in solidity, this is done by simply declaring variables inside of the contract, like so:

```solidity
contract MyContract {
    uint128 public my_public_state_variable;
}
```

in aztec this process is a bit more involved, as not only are there both private and public variables, there are multiple _kinds_ of state variables. we do this by defining a `struct` <link to noir structs> that will hold the entire contract state. we call this struct _the storage struct_, and each variable inside this struct is called _a state variable_<link>.

```noir
use aztec::macros::aztec;

#[aztec]
contract MyContract {
    use aztec::{
        macros::storage, 
        state_vars::{PrivateMutable, PublicMutable}
    };

    // the storage struct can have any name, but it is typically just called `Storage`. it must have the `#[storage]` struct applied to it.
    // this struct must also have a generic type called C or Context. for now try to pretend it is not there
    #[storage]
    struct Storage<C> {
        // a private numeric value which can change over time. this value will be hidden, and only people who are shown the secret will be able to know its current value
        my_private_state_variable: PrivateMutable<u128, C>,
        // a public numeric value which can change over time. this value will be known to everyone. this is equivalent to the solidity example above
        my_public_state_variable: PublicMutable<u128, C>,
    }
}
```

>all contract state must be in a single struct. the #[storage] macro can only be used once

## Events

same as in solidity, aztec contracts can define events which notify people that something has happened. in aztec however events can also be emitted privately, in which case only some users will learn of the event.

events are simply a struct marked with the `#[event]` macro:
```noir
#[event]
struct Transfer {
    from: AztecAddress,
    to: AztecAddress,
    amount: 128,
}
```

## Functions

contracts are interacted with by invoking their `external` functions. there are three kinds of `external` functions:

- external private functions, which reveal nothing about their execution and are run on the user's device, producing a zero knowledge proof that is sent to the network as part of a transaction.
- external public functions, which are invoked publicly by nodes in the network (like any `external` Solidity contract function) as they process transactions
- external utility functions, which are executed on the user's device by applications in order to display useful information, e.g. retrieve contract state. these are never part of a transaction

```noir
use aztec::macros::aztec;

#[aztec]
contract MyContract {
    use aztec::macros::functions::external;

    #[external("private")]
    fn my_private_function(parameter_a: u128, parameter_b: AztecAddress) {
        ...
    }

    #[external("public")]
    fn my_public_function(parameter_a: u128, parameter_b: AztecAddress) {
        ...
    }

    #[external("utility")]
    fn my_utility_function(parameter_a: u128, parameter_b: AztecAddress) {
        ...
    }
}
```

additionally, contracts can also define `internal` functions, which cannot be called by other contracts (like any `internal` Solidity function). these exist to help organize the user's code, reuse functionality, etc.

// show an internal fn being called from one or two external ones. this feature is not yet complete in aztecnr

### Current Limitations

all #[external] contract functions must be defined _directly inside the `contract` block_, that is, in the same file. it is possible to define `#[internal]` and helper functions in `mod`s in other files, but not `#[external]` functions.

additionally, noir does not feature inheritance nor is there currently any other mechanism to extend and reuse contract logic. e.g. it is not possible to take a token contract and extend it to add minting functionality, or to reuse it in a liquidity pool. like in vyper, the entire logic must live in a single file.

we expect to lift some of these restrictions sometime after the release of noir 1.0.