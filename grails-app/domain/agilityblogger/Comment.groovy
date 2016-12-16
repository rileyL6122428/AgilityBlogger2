package agilityblogger

class Comment {
  String body
  Date dateCreated

  static belongsTo = [post: Post, author: User]
  static constraints = {
    body blank: false
  }
}
