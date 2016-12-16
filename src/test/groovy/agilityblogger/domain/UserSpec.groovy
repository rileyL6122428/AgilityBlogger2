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

      void "#findBlog(name) returns a blog when the user has a blog with a matching name"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog1 = new Blog(name: "blog1")
          def blog2 = new Blog(name: "blog2")
          user.addToBlogs(blog1)
          user.addToBlogs(blog2)
          user.save(flush: true)
        when:
          def retrievedBlog1 = user.findBlog("blog1")
          def retrievedBlog2 = user.findBlog("blog2")
        then:
          retrievedBlog1.name == blog1.name
          retrievedBlog1.id == blog1.id

          retrievedBlog2.name == blog2.name
          retrievedBlog2.id == blog2.id
      }

      void "#findBlog(name) returns null when the user does not have a blog with a matching name"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog = new Blog(name: "blog")
          user.addToBlogs(blog)
          user.save(flush: true)
        when:
          def retrievedBlog = user.findBlog("glob")
        then:
          retrievedBlog == null
      }

      void "#findPost(blogName, postTitle) returns a post when the user has a blog with a post of the corresponding names"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog = new Blog(name: "blog")
          user.addToBlogs(blog)
          user.save(flush: true)

          def post1 = new Post(title: "title1", body: "body1")
          def post2 = new Post(title: "title2", body: "body2")
          blog.addToPosts(post1)
          blog.addToPosts(post2)
          blog.save(flush:true)
        when:
          def retrievedPost1 = user.findPost("blog", "title1")
          def retrievedPost2 = user.findPost("blog", "title2")
        then:
          retrievedPost1.title == post1.title
          retrievedPost1.body == post1.body
          retrievedPost1.id == post1.id

          retrievedPost2.title == post2.title
          retrievedPost2.body == post2.body
          retrievedPost2.id == post2.id
      }

      void "#findPost(blogName, postTitle) return null when the user does not have a blog of the given blogName"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog = new Blog(name: "blog")
          user.addToBlogs(blog)
          user.save(flush: true)

          def post = new Post(title: "title", body: "body1")
          blog.addToPosts(post)
          blog.save(flush:true)
        when:
          def retrievedPost = user.findPost("glob","title")
        then:
          retrievedPost == null
      }

      void "#findPost(blogName, postTitle) returns null when the user does not have a post under a blog of the corresponding name"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog = new Blog(name: "blog")
          user.addToBlogs(blog)
          user.save(flush: true)

          def post = new Post(title: "title", body: "body1")
          blog.addToPosts(post)
          blog.save(flush:true)
        when:
          def retrievedPost = user.findPost("blog", "titleeeeeee")
        then:
          retrievedPost == null
      }

      void "#findPost(blogName, postTitle) returns null when the user does not have a post under a blog of the corresponding name"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog = new Blog(name: "blog")
          user.addToBlogs(blog)
          user.save(flush: true)

          def post = new Post(title: "title", body: "body1")
          blog.addToPosts(post)
          blog.save(flush:true)
        when:
          def retrievedPost = user.findPost("blog", "titleeeeeee")
        then:
          retrievedPost == null
      }

      void "#findPost(blogName, postTitle) returns null when the user does not have a post under a blog of the corresponding name"() {
        given:
          def user = new User(username: "username", password: "password")
          def blog = new Blog(name: "blog")
          user.addToBlogs(blog)
          user.save(flush: true)

          def post = new Post(title: "title", body: "body1")
          blog.addToPosts(post)
          blog.save(flush:true)
        when:
          def retrievedPost = user.findPost("blog", "titleeeeeee")
        then:
          retrievedPost == null
      }
}
