package agilityblogger

import spock.lang.Ignore;
import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock
import grails.converters.JSON

@TestFor(AuthenticationController)
@Mock(User)
class AuthControllerSpec extends Specification {

    def user, userFormatted;
    def errors, formattedErrors;

    AuthenticationService authServiceMock;
    JSONFormatter formatterMock;

    def setup() {
      user = new User(username: "USERNAME", password: "PASSWORD").save(flush: true)
      userFormatted = [user: [username: user.username, id: user.id]]
      errors = ["SAMPLE ERROR MSG"]
      formattedErrors = [errors: [list: errors]]

      authServiceMock = Mock(AuthenticationService)
      formatterMock = Mock(JSONFormatter)

      controller.authService = authServiceMock
      controller.respFormatter = formatterMock
    }

    def cleanup() {
      User.deleteAll()
    }

    void "#createAccount sends an error message when unable to create a user"() {
      given:
        request.method = 'POST'
        request.json = '{"username": "username", "password": ""}'
      when:
        controller.createAccount()
      then:
        1 * authServiceMock.createUser(request.JSON) >> null
        1 * authServiceMock.createUserErrorMsgs(request.JSON) >> errors
        1 * formatterMock.formatErrors(errors) >> formattedErrors
        0 * _._
        controller.response.status == 409
        controller.response.json == formattedErrors
    }

    void "#createAccount sends and sets the session for a user when a new user is created"() {
      given:
        request.method = 'POST'
        request.json = '{"username": "username", "password": "password"}'
      when:
        controller.createAccount()
      then:
        1 * authServiceMock.createUser(request.JSON) >> user
        1 * formatterMock.formatUser(user) >> userFormatted
        0 * _._
        controller.response.status == 201
        session.user.username == user.username
        controller.response.json == userFormatted
    }

    void "#logIn returns an error message when user cannot be found with given params"() {
      given:
        request.method = 'POST'
        request.json = '{"username": "userna", "password": "passwo"}'
      when:
        controller.logIn()
      then:
        1 * authServiceMock.findUser(request.JSON) >> null
        1 * authServiceMock.findUserErrorMsgs() >> errors
        1 * formatterMock.formatErrors(errors) >> formattedErrors
        0 * _._
        controller.response.status == 409
        controller.response.json == formattedErrors
    }

    void "#logIn sets the session for, and returns a user when proper params are submitted"() {
      given:
        request.method = 'POST'
        request.json = '{"username": "username", "password": "password"}'
      when:
        controller.logIn()
      then:
        1 * authServiceMock.findUser(request.JSON) >> user
        1 * formatterMock.formatUser(user) >> userFormatted
        0 * _._
        session.user.username == user.username
        controller.response.status == 200
        controller.response.json == userFormatted
    }

    void "#signOut nulls the session and returns a success message"() {
      given:
        def notificationMsg = "Sign out successful"
        def formattedNotification = [notification: notificationMsg]
        session.user = [username: user.username]
      when:
        controller.signOut()
      then:
        1 * formatterMock.formatNotification(notificationMsg) >> formattedNotification
        0 * _._
        session.user == null
        controller.response.status == 200
        controller.response.json == formattedNotification
    }

    void "#sessionUser returns a user when a session user is set"() {
      given:
        session.user = [username: user.username]
      when:
        controller.sessionUser()
      then:
        1 * authServiceMock.findSessionUser(controller.session) >> user
        1 * formatterMock.formatUser(user) >> userFormatted
        0 * _._
        controller.response.status == 200
        controller.response.json == userFormatted
    }

    void "#sessionUser returns an error message when a session user is not set"() {
      when:
        controller.sessionUser()
      then:
        1 * authServiceMock.findSessionUserErrorMsgs() >> errors
        1 * formatterMock.formatErrors(errors) >> formattedErrors
        0 * _._
        controller.response.status == 401
        controller.response.json == formattedErrors
    }

}
