package agilityblogger

class BlogService {
  def blogsForAuthor(authorName) {
    def author = User.findByUsername(authorName)
    return (author) ? Blog.findAllByAuthor(author) : null
  }

  def blogsForAuthorErrors(authorName) {
    return ["Unable to find author with name " + params.authorName]
  }
}
