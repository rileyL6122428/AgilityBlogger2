package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

@Mock(User)
class AuthenticationServiceImplSpec extends Specification {

    AuthenticationService authService

    def setup() {
      authService = new AuthenticationServiceImpl()
    }

    def cleanup() {
      User.deleteAll()
    }

    void "#createUser creates and returns a user with proper params"() {
      given:
        def newUserParams = [username: "username", password: "password"]
      when:
        def returnedUser = authService.createUser(newUserParams)
      then:
        User.list().size() == 1
        returnedUser instanceof User == true
        returnedUser.username == newUserParams.username
        returnedUser.password == newUserParams.password
    }

    void "#createUser returns null and does not persist a user when params do not pass validations"() {
      given:
        def newUserParams = [username: "user", password: "password"]
      when:
        def returnedUser = authService.createUser(newUserParams)
      then:
        User.list().size() == 0
        returnedUser == null
    }

    void "#findUser finds an existing user when proper params are supplied"() {
      given:
        def user = new User(username: "username", password: "password").save(flush: true)
      when:
        def returnedUser = authService.findUser([username: user.username, password: user.password])
      then:
        returnedUser == user
    }

    void "#findUser returns null when an existing user does not exist"() {
      given:
        def nonexistentUserParams = [username: "nonexistent", password: "password"]
      when:
        def returnedUser = authService.findUser(nonexistentUserParams)
      then:
        returnedUser == null
    }

    void "#findSessionUser returns a user when a user exists"() {
      given:
        def user = new User(username: "username", password: "password").save(flush: true)
        def session = [user: user]
      when:
        def returnedUser = authService.findSessionUser(session)
      then:
        returnedUser == user
    }

    void "#findSessionUser returns null when the sessionUser is not set"() {
      given:
        def session = [user: null]
      when:
        def returnedUser = authService.findSessionUser(session)
      then:
        returnedUser == null
    }

}
