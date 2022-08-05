class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (let money of this.transactions) {
      sum += money.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return ((this.amount.balance - this.amount) >= 0);
  }
}

const myAccount = new Account('PurpleKnife');

console.log('Current balance before transactions is:', myAccount.balance);

const t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log(`Oops, you tried to withdraw. Balance is ${myAccount.balance}, we cannot proceed with this transaction.`);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('Deposit:', myAccount.balance);

console.log('Current balance after transactions is:', myAccount.balance);
console.log('Your transaction history is:', myAccount.transactions);
