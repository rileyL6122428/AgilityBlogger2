package agilityblogger

class BlogServiceImpl implements BlogService {

  List blogsForAuthor(authorName) {
    def author = User.findByUsername(authorName)
    if(!author) { return null }

    def blogs = Blog.findAllByAuthor(author)
    return (blogs) ? blogs : []
  }

  List blogsForAuthorErrors(authorName) {
    return ["Unable to find author with name " + authorName]
  }
  
}
