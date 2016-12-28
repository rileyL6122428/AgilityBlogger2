package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

@TestFor(AuthenticationController)
@Mock(User)
class AuthControllerSpec extends Specification {

    def setup() {}
    def cleanup() {}

    void "#createAccount sends an error message when password field is empty"() {
      given:
        request.json = '{"username": "username", "password": ""}'
      when:
        controller.createAccount()
      then:
        controller.response.status == 409
        view == '/api/errors'
        model.errors.size() == 1
        model.errors[0] == 'Password field is empty'
    }

    void "#createAccount sends an error message when username field is empty"() {
      given:
        request.json = '{"username": "", "password": "password"}'
      when:
        controller.createAccount()
      then:
        controller.response.status == 409
        view == '/api/errors'
        model.errors.size() == 1
        model.errors[0] == "Username field is empty"
    }

    void "#createAccount sends an error message when the username is already taken"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        request.json = '{"username": "username", "password": "password"}'
      when:
        controller.createAccount()
      then:
        controller.response.status == 409
        view == '/api/errors'
        model.errors.size() == 1
        model.errors[0] == "Username is already taken"
    }

    void "#createAccount sends, sets the session for, and persists a user when proper params are submitted"() {
      given:
        request.method = 'POST'
        request.json = '{"username": "username", "password": "password"}'
      when:
        controller.createAccount()
      then:
        controller.response.status == 201
        view == '/api/authentication/user'
        model.user.username == "username"

        session.user.username == 'username'

        def allPersistedUsers = User.list()
        allPersistedUsers.size() == 1
        allPersistedUsers[0].username == "username"
        allPersistedUsers[0].password == "password"
    }

    void "#logIn returns an error message when user cannot be found with given params"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        request.json = '{"username": "userna", "password": "passwo"}'
      when:
        controller.logIn()
      then:
        controller.response.status == 409
        view == '/api/errors'
        model.errors.size() == 1
        model.errors[0] == "user cannot be found with given params"
    }

    void "#logIn sets the session for, and returns user when proper params are submitted"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        request.json = '{"username": "username", "password": "password"}'
      when:
        controller.logIn()
      then:
        session.user.username == 'username'
        controller.response.status == 200

        def allPersistedUsers = User.list()
        allPersistedUsers.size() == 1
        allPersistedUsers[0].username == "username"
        allPersistedUsers[0].password == "password"

        view == '/api/authentication/user'
        model.user.username == "username"
    }

    void "#signOut nulls the session and returns a success message"() {
      given:
        session.user = [username: "username"]
      when:
        controller.signOut()
      then:
        session.user == null
        controller.response.status == 200
        view == '/api/authentication/signOut'
    }

    void "#sessionUser returns a user when a session user is set"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        session.user = [username: "username"]
      when:
        controller.sessionUser()
      then:
        controller.response.status == 200
        view == '/api/authentication/user'
        model.user.username == "username"
    }

    void "#sessionUser returns an error message when a session user is not set"() {
      when:
        controller.sessionUser()
      then:
        controller.response.status == 401
        view == '/api/errors'
        model.errors.size() == 1
        model.errors[0] == "User not signed in"
    }

}
