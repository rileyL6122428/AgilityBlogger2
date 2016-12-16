package agilityblogger

class User {
  String username
  String password

  static hasMany = [blogs: Blog, comments: Comment]
  static mappedBy = [posts:"author", comments: "author"]

  static constraints = {
    username size: 5..25, blank: false, unique: true, matches: /[0-9a-zA-Z_\[\]\\\^\$\.\|\?\*\+\(\)~!@#%&=]*/
    password size: 6..25, blank: false
  }

  def findBlog(blogName) {
    return Blog.findByAuthorAndName(this, blogName)
  }

  def findPost(blogName, postTitle) {
    def blog = findBlog(blogName)
    return Post.findByBlogAndTitle(blog, postTitle)
  }
}
