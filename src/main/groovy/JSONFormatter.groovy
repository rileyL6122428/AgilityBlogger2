package agilityblogger

interface JSONFormatter {

  Map formatBlogs(blogs)
  Map formatErrors(errors)
  Map formatUser(user)
  Map formatNotification(notification)

}
