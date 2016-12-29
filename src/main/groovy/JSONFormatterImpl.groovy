package agilityblogger

class JSONFormatterImpl implements JSONFormatter {
  Map formatBlogs(blogs) {
    return [blogs: blogs]
  }

  Map formatErrors(errors) {
    return [errors: [list: errors]]
  }

  Map formatUser(user) {
    return ([
      user: [username: user.username, id: user.id]
    ]);
  }

  Map formatNotification(notification) {
    return [notification: notification]
  }
}
