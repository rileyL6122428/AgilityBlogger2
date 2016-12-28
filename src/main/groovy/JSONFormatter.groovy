package agilityblogger

class JSONFormatter {
  def formatBlogs(blogs) {
    return [blogs: blogs]
  }

  def formatErrors(errors) {
    return [errors: [list: errors]]
  }

  def formatUser(user) {
    return ([
      user: [username: user.username, id: user.id]
    ]);
  }

  def formatNotification(notification) {
    return [notification: notification]
  }
}
