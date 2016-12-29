package agilityblogger

interface BlogService {
  List blogsForAuthor(authorName)
  List blogsForAuthorErrors(authorName)
}
