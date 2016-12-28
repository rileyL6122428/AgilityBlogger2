package agilityblogger

import static org.springframework.http.HttpStatus.*
import grails.converters.JSON

class AuthenticationController {

  static responseFormats = ['json', 'xml']

  AuthenticationService authService = new AuthenticationService();

  def createAccount() {
    def user = authService.createUser(request.JSON)

    if(user){
      response.status = 201
      session.user = [username: user.username]
      render(view:"/api/authentication/user", model: [user: user])

    } else {
      response.status = 409;
      def errors = authService.createUserErrorMsgs(request.JSON)
      render(view:"/api/errors", model: [errors: errors])
    }
  }

  def logIn() {
    def user = authService.findUser(request.JSON)

    if(user) {
      session["user"] = [username: user.username]
      render(view:"/api/authentication/user", model: [user: user])

    } else {
      response.status = 409
      def errors = authService.findUserErrorMsgs()
      render(view:"/api/errors", model: [errors: errors])
    }
  }

  def signOut() {
    session["user"] = null
    render(view: "/api/authentication/signOut")
  }

  def sessionUser() {
    if(session.user) {
      def user = authService.findSessionUser(session)
      render(view:"/api/authentication/user", model: [user: user])

    } else {
      response.status = 401
      def errors = authService.findSessionUserErrorMsgs()
      render(view:"/api/errors", model: [errors: errors])
    }
  }

}
