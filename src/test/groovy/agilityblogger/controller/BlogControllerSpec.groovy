package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

@Mock([User, Blog, Post])
@TestFor(BlogController)
class BlogControllerSpec extends Specification {

    def author, blog1, blog2;

    BlogService blogServiceMock;
    JSONFormatter formatterMock;

    def setup() {
      author = new User(username: "username", password: "password")
      blog1 = new Blog(name: "blog1")
      blog2 = new Blog(name: "blog2")

      blogServiceMock = Mock(BlogService)
      formatterMock = Mock(JSONFormatter)

      controller.blogService = blogServiceMock
      controller.formatter = formatterMock
    }

    def cleanup() {}

    void "#getUserBlogs should return a user's blogs when the author can be found"() {
      given:
        params.authorName = "username"
        def blogList = [blog1, blog2]
        def formattedBlogsList = [blogs: blogList]
      when:
        controller.getUserBlogs()
      then:
        1 * blogServiceMock.blogsForAuthor('username') >> blogList
        1 * formatterMock.formatBlogs(blogList) >> formattedBlogsList
        0 * _._
        def response = controller.response.json
        response.blogs.size() == blogList.size()
        response.blogs[0].name == blog1.name
        response.blogs[1].name == blog2.name
    }

    void "#getUserBlogs should return a error when the author cannot be found"() {
      given:
        params.authorName = "user"
        def errors = ["errors for formatErrors"]
        def formattedErrorList = [errors: [list: errors]]
      when:
        controller.getUserBlogs()
      then:
        1 * blogServiceMock.blogsForAuthor('user') >> null
        1 * blogServiceMock.blogsForAuthorErrors('user') >> errors
        1 * formatterMock.formatErrors(errors) >> formattedErrorList
        0 * _._
        def response = controller.response.json
        response.errors.list.size() == 1
        response.errors.list[0] == "errors for formatErrors"
    }
}
