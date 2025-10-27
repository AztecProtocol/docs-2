# Aztec.nr Overview

aztec.nr is a noir library used to develop and test aztec smart contracts. it contains both high level abstractions (state variables, messages) and low level protocol primitives, providing granular control to developers if they want custom contracts.

## why is it needed

noir can be used to write circuits, but aztec contracts are more complex than this. they include multiple external functions, each of a different type: circuits for private functions, avm bytecode for public functions, and brillig bytecode for utility functions. the circuits for private functions are also quite particular in that they need to interact with the protocol's kernel circuits in very specific ways, so manually writing them and then combining everything into a contract artifact is quite involved work. aztec-nr takes care of all of this heavy lifting and makes writing contracts as simple as marking functions with the corresponding attributes e.g. `#[external(private)]`.

it also allows safe and easy implementation of a bunch of well understood design patterns, such as the multiple kinds of private state variables, making it so developers don't need to understand the nitty gritty of how the protocol works. these features are optional however, and advanced users are not prevented by the library from building their own custom solutions.

## design principles

Make it hard to shoot yourself in the foot by making it clear when something is unsafe. Dangerous actions should be easy to spot. e.g. ignoring return values or calling functions with the `_unsafe` prefix. This is achieved by having rails that intentionally trigger a developer's "WTF?" response, to ensure they understand what they're doing.

a good example of this is writing to private state variables. These functions return a `NoteMessagePendingDelivery` struct, which results in a compiler error unless used. This is because writing to private state also requires sending an encrypted message with the new state to the people that need to access it - otherwise, because it is private, they will not even know the state changed.

```
storage.votes.insert(new_vote); // -> compiler error - unused NoteMessagePendingDelivery return value 
storage.votes.insert(new_vote).deliver(vote_counter); // the vote counter account will now be notified of the new vote
```