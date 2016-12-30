package agilityblogger

import org.springframework.stereotype.Service


interface BlogService {
  List blogsForAuthor(authorName)
  List blogsForAuthorErrors(authorName)
}
