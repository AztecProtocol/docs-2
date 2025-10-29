# Private Token Contract

aztec contracts have both private and public functions. let's start with the public part, building an equivalent erc20 token:

```rust
#[aztec]
contract token {
    // declare state variables
    #[storage]
    struct Storage {
        // use map to create a publicmutable state variable for each user. a public mutable value is one that is publicly
        // known (not private), and which can be mutated (changed) - other kinds of state variables exist. this public
        // mutable holds u128 (unsigned 128 bit integers), for the token balance of each account
        //
        // the equivalent solidity declaration is
        //  mapping(address => uint128) private balances;
        balances: Map<Address, PublicMutable<u128>>,
    }

    // declare an event for token transfers
    // 
    // the equivalent solidity declaration is
    // event Transfer(address from, address to, uint128 amount);
    #[event]
    struct Transfer {
        from: Address,
        to: Address,
        amount: u128,
    }

    // declare an external public function for transferring tokens.
    //
    // the equivalent solidity declaration is
    // function transfer(address to, uint128 amount) external
    #[external(public)]
    fn transfer(to: address, amount: u128) {
        // read the sender's current balance
        let current_sender_balance = self.storage.balances.at(self.msg_sender).read();
        // subtract amount and store again
        self.storage.balances.at(self.msg_sender).write(current_sender_balance.sub(amoun));

        // same for the recipient, but adding
        let current_recipient_balance = self.storage.balances.at(to).read();
        self.storage.balances.at(to).write(current_recipient_balance.add(amoun));

        // emit an event
        self.emit(Transfer { self.msg_sender, to, amount });
    }

    // meta: consider also writing a balance_of getter
}
```

now add the capacity  private balance (use the balance set library to avoid immediately exposing notes and private set).

```rust
#[aztec]
contract token {
    #[storage]
    struct Storage {
        balances: Map<Address, PublicMutable<u128>>,
        // use map to create a balance set state variable for each user. whenever a user is sent tokens private, a note
        // is created and added to this set, and the aggregate of all notes makes up their balance.
        private_balances: Map<AztecAddress, BalanceSet<Context>, Context>,
    }

    // declare an external private function for transferring tokens. the called function, parameters, contract address,
    // caller, will all remain hidden
    #[external(private)]
    fn transfer_privately(to: address, amount: u128) {
        // subtract from the sender's set
        let change_note_message = self.storage.private_balances.at(self.msg_sender()).sub(amount);
        // this likely created a 'change' note if the sender's notes did not exactly add up to the amount to send. a
        // message with the contents of this note is sent to the sender so that they can find it and use it
        change_note_message.deliver(self.msg_sender());

        // same for the recipient, but adding
        let recipient_note_message = self.storage.balances.at(to).add(amount);
        // the recipient also needs to be told about the the note created for them - otherwise they won't be able to
        // find it, as it is private
        recipient_note_message.deliver(to);

        // emit an event - also privately! in this case we deliver the encrypted message with the event contents to the
        // recipient, to let them know we've transferred to them
        self.emit(to, Transfer { self.msg_sender, to, amount });
    }
}
```

things to notice that were different:
 - new state variables with different primitives
 - because state changes are private, we need to send messages to the parties involved so that they can find the relevant secret information

this example glosses over a lot of details, including the different ways there are to deliver messages, the performance tradeoffs that exist in private functions, or even how to authorize other contracts to spend tokens.

something else that's not covered here because it greatly exceeds the scope of a simple demonstration is how to _combine_ private and public functions. it's not just public state with private functions bolted on - the two can interact with one another. for example, it is possible to privately transfer tokens to someone and have them show up as their public balance, or to take public tokens and transfer them to a private recipient. it is even possible to set things up so that a third party can send us tokens in the future _without knowing who we are_, for example completing a private order in an orderbook-based exchange.