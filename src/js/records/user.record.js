export class User {
  constructor(wallet, name) {
    this.wallet = wallet;
    this.name = name;
  }
  get showWallet() {
    return this.wallet;
  }
  get showName() {
    return this.name;
  }
  set setWallet(newWallet) {
    this.wallet = newWallet;
  }
}
