package agilityblogger

class JSONFormatter {
  def formatBlogs(blogs) {
    return [blogs: blogs]
  }

  def formatErrors(errors) {
    return [errors: [list: errors]]
  }
}
