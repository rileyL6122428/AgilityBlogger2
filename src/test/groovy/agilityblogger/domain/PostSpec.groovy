package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Post)
@Mock([User, Blog, Comment])
class PostSpec extends Specification {

      def setup() {}
      def cleanup() {}

      void "#save will not save and return null when a post does not belong to a blog"() {
        expect:
          new Post(body: "BODY", title: "TITLE").save(flush: true) == null
          Post.list().size() == 0
      }

      void "#save will not save and return null when a post when a posts title exceeds 60 characters"() {
        when:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(body: "BODY", blogId: 1)
          post.title = ''
          (1..61).each{ post.title += 'a' }

          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
        then:
          post.save(flush: true) == null
          Post.list().size() == 0
      }

      void "#save will not save and return null when a post has empty fields"() {
        when:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")

          def postWithoutBody = new Post(title: "TITLE")
          def postWithoutTitle = new Post(body: "BODY")
          def postWithNoParametersSet = new Post()

          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(postWithoutBody).save(flush: true)
          blog.addToPosts(postWithoutTitle).save(flush: true)
          blog.addToPosts(postWithNoParametersSet).save(flush: true)
        then:
          postWithoutBody.save() == null
          postWithoutTitle.save() == null
          postWithNoParametersSet.save() == null
          Post.list().size() == 0
      }

      void "#save will save and return a post when the post is assigned to a user and has proper field values"() {
        given:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")

          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
        when:
          def allSavedPosts = Post.list()
        then:
          allSavedPosts.size() == 1
          allSavedPosts[0].title == post.title
          allSavedPosts[0].body == post.body
      }

      void "#comments will return 0 comments when there are 0 comments"() {
        given:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")

          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
        when:
          def comment = post.comments
        then:
          comment == null
      }

      void "#comments will return 1 comment when there is one comment on the post"() {
        given:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          def newComment = new Comment(body: "BODY")

          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)

          newComment.author = user
          newComment.post = post
          newComment.save(flush: true)
        when:
          def returnedComments = post.comments
        then:
          returnedComments.size() == 1
          returnedComments[0].body == newComment.body
      }

      void "#comments will return many comments when there are many comments on the post"() {
        given:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)

          def newComments = []

          for(int i = 1; i < 4; i++){
            def newComment = new Comment(body: "BODY" + i)
            newComment.author = user
            newComment.post = post
            newComment.save(flush: true)
            newComments.push(newComment)
          }
        when:
          def returnedComments = post.comments
        then:
          returnedComments.size() == 3
          for(int i = 1; i < 4; i++){
            returnedComments[i - 1].body == newComments[i - 1].body
          }
      }

      void "#blog will return the post blog"() {
        given:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
        when:
          def retrievedBlog = post.blog
        then:
          retrievedBlog == blog
      }

      void ".dateCreated returns the date when a blog was persisted"() {
        given:
          def user = new User(username: "USERNAME", password: "PASSWORD")
          def blog = new Blog(name: "NAME")
          def post = new Post(title: "TITLE", body: "BODY")
          user.addToBlogs(blog).save(flush: true)
          blog.addToPosts(post).save(flush: true)
        when:
          def dateCreated = post.dateCreated
        then:
          dateCreated.getClass() == java.util.Date
      }
}
