package agilityblogger

import spock.lang.Ignore;
import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock
import grails.converters.JSON

@Mock([User, Blog])
class JSONFormatterImplSpec extends Specification {

    User user
    Blog blog1, blog2
    JSONFormatter respFormatter

    def setup() {
      respFormatter = new JSONFormatterImpl()

      user = new User(username: "username", password: "password")
      blog1 = new Blog(name: "blog1")
      blog2 = new Blog(name: "blog2")
      user.addToBlogs([blog1, blog2])
      user.save(flush: true)
    }

    void "#formatBlogs returns the appropriatly formatted response"() {
      given:
        def blogList = [blog1, blog2]
      when:
        def formattedResponse = respFormatter.formatBlogs(blogList)
      then:
        formattedResponse.size() == 1
        formattedResponse.blogs == blogList
    }

    void "#formatErrors returns an appropriately formmated response"() {
      given:
        def errors = ["sample error msg 1", "sample error msg 2"]
      when:
        def formattedResponse = respFormatter.formatErrors(errors)
      then:
        formattedResponse.size() == 1
        formattedResponse.errors.size() == 1
        formattedResponse.errors.list == errors
    }

    void "#formatUser returns an appropriately formatted response"() {
      when:
        def formattedResponse = respFormatter.formatUser(user)
      then:
        formattedResponse.size() == 1
        formattedResponse.user.size() == 2
        formattedResponse.user.username == user.username
        formattedResponse.user.id == user.id
    }

    void "#formatNotification returns an appropriately formatted response"() {
      given:
        def notification = "sample notification"
      when:
        def formattedResponse = respFormatter.formatNotification(notification)
      then:
        formattedResponse.size() == 1
        formattedResponse.notification == notification
    }

}
