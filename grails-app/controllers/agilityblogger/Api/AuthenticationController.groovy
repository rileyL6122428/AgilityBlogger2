package agilityblogger

import static org.springframework.http.HttpStatus.*
import grails.converters.JSON

class AuthenticationController {

  static responseFormats = ['json', 'xml']

  AuthenticationService authService = new AuthenticationService()
  JSONFormatter formatter = new JSONFormatter()

  def createAccount() {
    def responseBody
    def user = authService.createUser(request.JSON)

    if(user){
      response.status = 201
      session.user = [username: user.username]
      responseBody = formatter.formatUser(user)
    } else {
      response.status = 409;
      responseBody = formatter.formatErrors(authService.createUserErrorMsgs(request.JSON))
    }

    render responseBody as JSON
  }

  def logIn() {
    def responseBody
    def user = authService.findUser(request.JSON)

    if(user) {
      session["user"] = [username: user.username]
      responseBody = formatter.formatUser(user)
    } else {
      response.status = 409
      responseBody = formatter.formatErrors(authService.findUserErrorMsgs())
    }

    render responseBody as JSON
  }

  def signOut() {
    def responseBody

    session["user"] = null
    responseBody = formatter.formatNotification("Sign out successful")

    render responseBody as JSON
  }

  def sessionUser() {
    def responseBody

    if(session.user) {
      def user = authService.findSessionUser(session)
      responseBody = formatter.formatUser(user)
    } else {
      response.status = 401
      responseBody = formatter.formatErrors(authService.findSessionUserErrorMsgs())
    }

    render responseBody as JSON
  }

}
