package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Blog)
@Mock([User, Post])
class BlogSpec extends Specification {
  def setup() {}
  def cleanup() {}

  void "#save will not save and return null when a blog is not assigned to an existing user"() {
    given:
      def blog = new Blog(name: "NAME")
    when:
      blog = blog.save(flush: true)
    then:
      blog == null
      Blog.list().size() == 0
  }

  void "#save will not save a blog and return null when the blog is not given a name"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      def blogWithoutName = new Blog()
      user.addToBlogs(blogWithoutName)
      user.save(flush: true)
    when:
      blogWithoutName = blogWithoutName.save(flush: true)
    then:
      blogWithoutName == null
      Blog.list().size() == 0
  }

  void "#save will not save and return null when two blogs assigned to the same author have the same name"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      user.addToBlogs(name: "name").save(flush: true)
      user.addToBlogs(name: "name").save(flush: true)
    when:
      def allSavedBlogs = Blog.list()
    then:
      allSavedBlogs.size() == 1
      allSavedBlogs[0].name == "name"
  }

  void "#save will save and return a blog when assigned to a user and when given a name that meets class constraints"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      def blog = new Blog(name: "BLOG_NAME")
      user.addToBlogs(blog)
    when:
      blog = blog.save(flush: true)
    then:
      def allBlogs = Blog.list()
      allBlogs.contains(blog) == true
      allBlogs.size() == 1
  }

  void "#save will persist two blogs with the same name if they are assigned to different users"() {
    given:
      def user1 = new User(username: "USERNAME1", password: "PASSWORD")
      def user2 = new User(username: "USERNAME2", password: "PASSWORD")
      user1.addToBlogs(name: "name").save(flush: true)
      user2.addToBlogs(name: "name").save(flush: true)
    when:
      def allSavedBlogs = Blog.list()
    then:
      allSavedBlogs.size() == 2
      allSavedBlogs[0].name == "name"
      allSavedBlogs[1].name == "name"
  }

  void "#posts returns all of the blog's posts"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      def blog = new Blog(name: "name")
      user.addToBlogs(blog).save(flush: true)

      def post1 = new Post(title: "title1", body: "body1")
      def post2 = new Post(title: "title2", body: "body2")
      blog.addToPosts(post1).addToPosts(post2).save(flush: true)
    when:
      def posts = blog.posts
    then:
      posts.size() == 2
      posts.contains(post1)
      posts.contains(post2)
  }

  void "#posts returns a list with a single post when a blog has a single post"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      def blog = new Blog(name: "name")
      user.addToBlogs(blog).save(flush: true)

      def post = new Post(title: "title", body: "body")
      blog.addToPosts(post).save(flush: true)
    when:
      def posts = blog.posts
    then:
      posts.size() == 1
      posts.contains(post)
  }

  void "#posts returns null if a blog does not have any posts"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      def blog = new Blog(name: "name")
      user.addToBlogs(blog).save(flush: true)
    when:
      def posts = blog.posts
    then:
      posts == null
  }

  void "#author returns a blog's author"() {
    given:
      def user = new User(username: "USERNAME", password: "PASSWORD")
      def blog = new Blog(name: "name")
      user.addToBlogs(blog).save(flush: true)
    when:
      def author = blog.author
    then:
      author.username == user.username
      author.password == user.password
      author.id == user.id
  }
}
