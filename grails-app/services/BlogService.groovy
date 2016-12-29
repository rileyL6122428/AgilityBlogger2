package agilityblogger

class BlogService {
  def blogsForAuthor(authorName) {
    def author = User.findByUsername(authorName)
    if(!author) { return null }

    def blogs = Blog.findAllByAuthor(author)
    return (blogs) ? blogs : []
  }

  def blogsForAuthorErrors(authorName) {
    return ["Unable to find author with name " + authorName]
  }
}
