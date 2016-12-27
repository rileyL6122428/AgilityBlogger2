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
      sendUser(user)
    } else {
      response.status = 409;
      sendErrorMessages(authService.createUserErrorMsgs(request.JSON))
    }
  }

  def logIn() {
    def user = authService.findUser(request.JSON)

    if(user) {
      session["user"] = [username: user.username]
      sendUser(user)
    } else {
      response.status = 409
      sendErrorMessages(authService.findUserErrorMsgs())
    }
  }

  def signOut() {
    session["user"] = null
    render authService.signOutNotification() as JSON
  }

  def sessionUser() {
    if(session.user) {
      def user = User.findByUsername(session.user.username)
      sendUser(user)
    } else {
      response.status = 401
      sendErrorMessages(["User not signed in"])
    }
  }

  //NOTE HELPER METHODS BELOW
  def sendUser(rawUser) {
    render(contentType:"text/json"){
      user(username: rawUser.username, id: rawUser.id)
    }
  }

  def sendErrorMessages(errorMessageList){
    def errorMessages =  [errorMessages: errorMessageList]
    render errorMessages as JSON
  }
}
