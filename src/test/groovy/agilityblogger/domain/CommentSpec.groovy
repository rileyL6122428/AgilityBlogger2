package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Comment)
@Mock([User, Blog, Post])
class CommentSpec extends Specification {

      def setup() {}

      def cleanup() {}

      void "#save does not save a comment and returns null when not assigned to a blog"() {
        given:
          def comment = new Comment(body: "body")
        when:
          comment = comment.save(flush: true)
        then:
          comment == null
          Comment.list().size() == 0
      }

      void "#save does not save and returns null when a comment has an empty body"() {
        given:
          def blogAuthor = new User(username:"BLOG AUTHOR", password:"PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          def commentAuthor = new User(username:"COMMENT AUTHOR", password: "PASSWORD")

          blogAuthor.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
          commentAuthor.save(flush: true)
        when:
          def bodylessComment = new Comment()
          bodylessComment.author = commentAuthor
          bodylessComment.post = post
          bodylessComment = bodylessComment.save(flush: true)
        then:
          bodylessComment == null
          Comment.list().size() == 0
      }

      void "#save saves a comment and returns the comment when the comment has a body and is attached to an author and post"() {
        given:
          def blogAuthor = new User(username:"BLOG AUTHOR", password:"PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          def commentAuthor = new User(username:"COMMENT AUTHOR", password: "PASSWORD")

          blogAuthor.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
          commentAuthor.save(flush: true)
        when:
          def comment = new Comment(body: "BODY")
          comment.post = post
          comment.author = commentAuthor
          comment = comment.save(flush: true)
        then:
          def allSavedComments = Comment.list()
          allSavedComments.size() == 1
          allSavedComments.contains(comment)
      }

      void "#post returns a comment's post"() {
        given:
          def blogAuthor = new User(username:"BLOG AUTHOR", password:"PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          def commentAuthor = new User(username:"COMMENT AUTHOR", password: "PASSWORD")

          blogAuthor.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
          commentAuthor.save(flush: true)

          def comment = new Comment(body: "BODY")
          comment.post = post
          comment.author = commentAuthor
          comment = comment.save(flush: true)
        when:
          def retrievedPost = comment.post
        then:
          retrievedPost == post
      }

      void "#author returns an comments's author"() {
        given:
          def blogAuthor = new User(username:"BLOG AUTHOR", password:"PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          def commentAuthor = new User(username:"COMMENT AUTHOR", password: "PASSWORD")

          blogAuthor.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
          commentAuthor.save(flush: true)

          def comment = new Comment(body: "BODY")
          comment.post = post
          comment.author = commentAuthor
          comment = comment.save(flush: true)
        when:
          def retrievedAuthor = comment.author
        then:
          retrievedAuthor == commentAuthor
      }

      void ".dateCreated stores the date when a comment was created"() {
        given:
          def blogAuthor = new User(username:"BLOG AUTHOR", password:"PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          def commentAuthor = new User(username:"COMMENT AUTHOR", password: "PASSWORD")

          blogAuthor.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
          commentAuthor.save(flush: true)

          def comment = new Comment(body: "BODY")
          comment.post = post
          comment.author = commentAuthor
          comment = comment.save(flush: true)
        when:
          def dateCreated = comment.dateCreated
        then:
          dateCreated.getClass() == java.util.Date
      }
}
