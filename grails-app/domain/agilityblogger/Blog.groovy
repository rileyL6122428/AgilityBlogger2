package agilityblogger

class Blog {
  String name
  User author

  static belongsTo = User
  static hasMany = [posts: Post]
  static mappedBy = [posts:"blog"]

  static constraints = {
    name size: 1..256, blank: false, validator: Blog.uniqueNamePerAuthorValidation
  }

  static uniqueNamePerAuthorValidation = { name, thisBlog ->
    def author = thisBlog.author

    if(!author) {
      return false
    } else {
      def blogsWithSameName = author.blogs.findAll{ it.name == name }
      return blogsWithSameName.size() < 2
    }
  }
}
