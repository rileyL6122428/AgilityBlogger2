export default class User {
  constructor(userData) {
    this.id = userData.id;
    this.username = userData.username;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }
}
