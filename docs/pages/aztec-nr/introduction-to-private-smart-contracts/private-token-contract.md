# Private Token Contract

aztec contracts have both private and public functions. let's start with the public part, building an equivalent erc20 token:

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
        // read current balance
        let current_sender_balance = self.storage.balances.at(self.msg_sender).read();
        // subtract amount and store again
        self.storage.balances.at(self.msg_sender).write(current_sender_balance.sub(amoun));

        // same for recipient, but adding
        let current_recipient_balance = self.storage.balances.at(to).read();
        self.storage.balances.at(to).write(current_recipient_balance.add(amoun));

        // emit an event
        self.emit(Transfer { self.msg_sender, to, amount });
    }

    // meta: consider also writing a balance_of getter
}

now add private balance (use the balance set library to avoid immediately exposing notes and private set)