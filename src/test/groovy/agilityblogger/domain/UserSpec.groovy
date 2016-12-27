package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(User)
@Mock([Blog, Post])
class UserSpec extends Specification {

      def setup() {}
      def cleanup() {}

      void "#save fails and returns null when a user has short username or password"() {
        given:
          def userWithShortUsername = new User(username: "shrt", password:"password")
          def userWithShortPassword = new User(username: "username", password:"pswrd")
          def userWithShortUsernameAndPassword = new User(username: "shrt", password: "pswrd")
        when:
          userWithShortUsername = userWithShortUsername.save(flush: true)
          userWithShortPassword = userWithShortPassword.save(flush: true)
          userWithShortUsernameAndPassword = userWithShortUsernameAndPassword.save(flush: true)
        then:
          userWithShortUsername == null
          userWithShortPassword == null
          userWithShortUsernameAndPassword == null
          User.list().size() == 0
      }

      void "#save fails and returns null when the user has an empty username or password"() {
        given:
          def userWithoutUsername = new User(password: "password")
          def userWithoutPassword = new User(username: "username")
          def userWithoutUsernameAndPassword = new User()
        when:
          userWithoutUsername = userWithoutUsername.save(flush: true)
          userWithoutPassword = userWithoutPassword.save(flush: true)
          userWithoutUsernameAndPassword = userWithoutUsernameAndPassword.save(flush: true)
        then:
          userWithoutUsername == null
          userWithoutPassword == null
          userWithoutUsernameAndPassword == null
          User.list() .size() == 0
      }

      void "#save fails when a user has a username that is already in use"() {
        given:
          new User(username: "username", password: "password1").save(flush: true)
          new User(username: "username", password: "password2").save(flush: true)
        when:
          def users = User.list()
        then:
          users.size() == 1
          users[0].username == "username"
          users[0].password == "password1"
      }

      void "#save returns the user when the user has field values that meet the domain class constraints"() {
        given:
          def user = new User(username: "username", password: "password")
        when:
          user = user.save(flush: true)
        then:
          def allUsers = User.list()
          allUsers.size() == 1
          allUsers.contains(user) == true
      }

      void "#save does not save a user when the username contains illegal characters"() {
        given:
        def usersWithIllegalCharacters = [
        new User(username: "user name2", password: "password"),
        new User(username: "user-name4", password: "password")
        ]
        when:
        usersWithIllegalCharacters.each{ it = it.save(flush: true) }
        then:
        for(int i = 0; i < usersWithIllegalCharacters.size(); i++){
          usersWithIllegalCharacters[i] == null
        }
        User.list().size() == 0
      }

      void "#blogs returns all of the blogs of the user as a list"() {
          given:
            def user = new User(username: "username", password: "password")
            def blog1 = new Blog(name: "blog1")
            def blog2 = new Blog(name: "blog2")
            user.addToBlogs(blog1)
            user.addToBlogs(blog2)
            user.save(flush: true)
          when:
            def userBlogs = user.blogs
          then:
            userBlogs.contains(blog1) == true
            userBlogs.contains(blog2) == true
      }

      void "#blogs returns null when a user does not have any blogs"() {
        given:
          def user = new User(username: "username", password: "password")
          user.save(flush: true)
        when:
          def userBlogs = user.blogs
        then:
          userBlogs == null
      }
}
