export default class Blog {
  constructor(storedBlog) {
    this.name = storedBlog.name;
  }

  getName() {
    return this.name;
  }
}
