package agilityblogger

class Post {
  String title
  String body
  Blog blog
  Date dateCreated

  static hasMany = [comments: Comment]
  static mappedBy = [comments:"post"]
  static belongsTo = Blog
  static mapping = {
    body sqlType: 'text'
  }

  static constraints = {
    title size: 1..60, blank: false
    body blank: false
  }
}
