package agilityblogger

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(AuthenticationController)
@Mock(User)
class AuthControllerSpec extends Specification {

    def setup() {}
    def cleanup() {}

    void "#createAccount sends an error message when password field is empty"() {
      given:
        params.username = 'username'
        params.password = ''
      when:
        controller.createAccount()
      then:
        controller.response.status == 409
        controller.response.json.errorMessages.contains("Password field is empty") == true
        controller.response.json.user == null
    }

    void "#createAccount sends an error message when username field is empty"() {
      given:
        params.username = ''
        params.password = 'password'
      when:
        controller.createAccount()
      then:
        controller.response.status == 409
        controller.response.json.errorMessages.contains("Username field is empty") == true
        controller.response.json.user == null
    }

    void "#createAccount sends an error message when the username is already taken"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        params.username = 'username'
        params.password = 'password'
      when:
        controller.createAccount()
      then:
        controller.response.status == 409
        controller.response.json.errorMessages.contains("Username is already taken") == true
        controller.response.json.user == null
    }

    void "#createAccount sends, sets the session for, and persists a user when proper params are submitted"() {
      given:
        request.method = 'POST'
        request.json = '{"username": "username", "password": "password"}'
      when:
        controller.createAccount()
      then:
        controller.response.status == 201
        controller.response.json.errorMessages == null
        controller.response.json.user.username == "username"

        session.user.username == 'username'

        def allPersistedUsers = User.list()
        allPersistedUsers.size() == 1
        allPersistedUsers[0].username == "username"
        allPersistedUsers[0].password == "password"
    }

    void "#logIn returns an error message when user cannot be found with given params"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        params.username = 'userna'
        params.password = 'passwo'
      when:
        controller.logIn()
      then:
        controller.response.status == 409
        controller.response.json.errorMessages.contains("user cannot be found with given params") == true
        controller.response.json.user == null
    }

    void "#logIn set the session for, and returns user when proper params are submitted"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        params.username = 'username'
        params.password = 'password'
      when:
        controller.logIn()
      then:
        session.user.username == 'username'
        controller.response.status == 200

        def allPersistedUsers = User.list()
        allPersistedUsers.size() == 1
        allPersistedUsers[0].username == "username"
        allPersistedUsers[0].password == "password"

        controller.response.json.errorMessages == null
        controller.response.json.user.username == "username"
    }

    void "#signOut nulls the session and returns a success message"() {
      given:
        session.user = [username: "username"]
      when:
        controller.signOut()
      then:
        session.user == null
        controller.response.status == 200
        controller.response.json.notification == "Signed out successfully"
    }

    void "#sessionUser returns a user when a session user is set"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        session.user = [username: "username"]
      when:
        controller.sessionUser()
      then:
        controller.response.status == 200
        controller.response.json.user.username == "username"
    }

    void "#sessionUser returns an error message when a session user is not set"() {
      when:
        controller.sessionUser()
      then:
        controller.response.status == 401
        controller.response.json.user == null
        controller.response.json.errorMessages.contains("User not signed in") == true
    }

}
