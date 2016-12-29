export default class Blog {
  constructor(blogData) {
    this.name = blogData.name;
    this.id = blogData.id
    this.authorId = blogData.author.id;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getAuthorId() {
    return this.authorId;
  }
}
