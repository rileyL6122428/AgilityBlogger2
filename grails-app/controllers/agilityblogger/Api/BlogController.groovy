package agilityblogger

import static org.springframework.http.HttpStatus.*
import grails.converters.JSON

class BlogController {

  static responseFormats = ['json', 'xml']

  BlogService blogService = new BlogService()
  JSONFormatter formatter = new JSONFormatter()

  def getUserBlogs() {
    def authorBlogs = blogService.blogsForAuthor(params.authorName)

    if(authorBlogs) {
      render formatter.formatBlogs(authorBlogs) as JSON

    } else {
      render formatter.formatErrors(blogService.blogsForAuthorErrors(params.authorName)) as JSON
    }
  }
}
