package agilityblogger

import static org.springframework.http.HttpStatus.*
import grails.converters.JSON

class BlogController {

  static responseFormats = ['json', 'xml']

  BlogService blogService
  JSONFormatter respFormatter

  def getUserBlogs() {
    def responseBody
    def authorBlogs = blogService.blogsForAuthor(params.authorName)

    if(authorBlogs != null) {
      responseBody = respFormatter.formatBlogs(authorBlogs)
    } else {
      response.status = 409
      def errors = blogService.blogsForAuthorErrors(params.authorName)
      responseBody = respFormatter.formatErrors(errors)
    }

    render responseBody as JSON
  }
}
