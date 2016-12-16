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
        def resp = controller.response.json
        resp.errorMessages.contains("Password field is empty") == true
        resp.user == null
    }

    void "#createAccount sends an error message when username field is empty"() {
      given:
        params.username = ''
        params.password = 'password'
      when:
        controller.createAccount()
      then:
        def resp = controller.response.json
        resp.errorMessages.contains("Username field is empty") == true
        resp.user == null
    }

    void "#createAccount sends an error message when the username is already taken"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        params.username = 'username'
        params.password = 'password'
      when:
        controller.createAccount()
      then:
        def resp = controller.response.json
        resp.errorMessages.contains("Username is already taken") == true
        resp.user == null
    }

    void "#createAccount sends, sets the session for, and persists a user when proper params are submitted"() {
      given:
        params.username = 'username'
        params.password = 'password'
      when:
        controller.createAccount()
      then:
        def resp = controller.response.json
        resp.errorMessages == null
        resp.user.username == "username"

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
        def resp = controller.response.json
        resp.errorMessages.contains("user cannot be found with given params") == true
        resp.user == null
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

        def allPersistedUsers = User.list()
        allPersistedUsers.size() == 1
        allPersistedUsers[0].username == "username"
        allPersistedUsers[0].password == "password"

        def resp = controller.response.json
        resp.errorMessages == null
        resp.user.username == "username"
    }

    void "#signOut nulls the session and returns a success message"() {
      given:
        session.user = [username: "username"]
      when:
        controller.signOut()
      then:
        session.user == null
        controller.response.json.notification == "Signed out successfully"
    }

    void "#sessionUser returns a user when a session user is set"() {
      given:
        new User(username: "username", password: "password").save(flush: true)
        session.user = [username: "username"]
      when:
        controller.sessionUser()
      then:
        def resp = controller.response.json
        resp.user.username == "username"
    }

    void "#sessionUser returns an error message when a session user is not set"() {
      when:
        controller.sessionUser()
      then:
        def resp = controller.response.json
        resp.user == null
        resp.errorMessages.contains("User not signed in") == true
    }

}
