package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

@Mock([User, Blog])
class BlogServiceImplSpec extends Specification {

    def author, blog1, blog2
    def bloglessAuthor
    BlogService blogService

    def setup() {
      blogService = new BlogServiceImpl()

      bloglessAuthor = new User(username:"blogless", password: "password").save(flush: true)

      author = new User(username: "username", password: "password")
      blog1 = new Blog(name: "blog1")
      blog2 = new Blog(name: "blog2")

      author.addToBlogs(blog1)
      author.addToBlogs(blog2)
      author.save(flush: true)
    }

    def cleanup() {
      User.deleteAll()
      Blog.deleteAll()
    }

    void "#blogsForAuthor returns null when a nonexistent author name is provided"() {
      given:
        def nonexistentAuthorname = "nonexistentAuthorname"
      when:
        def result = blogService.blogsForAuthor(nonexistentAuthorname)
      then:
        result == null
    }

    void "#blogsForAuthor returns a list of blogs when an author exists and the author has blogs"() {
      when:
        def result = blogService.blogsForAuthor(author.username)
      then:
        result.size() == 2
        result[0].name == blog1.name
        result[1].name == blog2.name
    }

    void "#blogsForAuthor returns an empty list when an author exists without any blogs"() {
      when:
        def result = blogService.blogsForAuthor(bloglessAuthor.username)
      then:
        result.size() == 0
    }

    void "#blogsForAuthorErrors returns the appropriate list of errors"() {
      given:
        def nonexistentAuthorname = "nonexistentAuthorname"
      when:
        def result = blogService.blogsForAuthorErrors(nonexistentAuthorname)
      then:
        result.size() == 1
        result[0] == "Unable to find author with name " + nonexistentAuthorname
    }

}
