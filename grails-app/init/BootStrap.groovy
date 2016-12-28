package agilityblogger

class BootStrap {

    def init = { servletContext ->
      def sampleAuthor = new User(username: "username", password: "password")
      def blog1 = new Blog(name: "blog1")
      def blog2 = new Blog(name: "blog2")

      sampleAuthor.addToBlogs(blog1)
      sampleAuthor.addToBlogs(blog2)

      sampleAuthor.save(flush: true)
    }

    def destroy = {}
}
