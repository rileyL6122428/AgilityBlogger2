package agilityblogger

import static org.springframework.http.HttpStatus.*
import grails.converters.JSON

class AuthenticationController {

  static responseFormats = ['json', 'xml']

  def createAccount() {
    def user = new User(request.JSON).save(flush: true)

    if(user){
      response.status = 201
      session.user = [username: user.username]
      sendUser(user)
    } else {
      response.status = 409;
      sendErrorMessages(errorMessagesForCreateAccount())
    }
  }

  def errorMessagesForCreateAccount() {
    def errorMessageList = []
    def userParams = request.JSON

    if(!userParams.password || userParams.password.length() == 0) {
      errorMessageList.push("Password field is empty")
    }
    if(!userParams.username || userParams.username.length() == 0) {
      errorMessageList.push("Username field is empty")
    }
    if(User.findByUsername(userParams.username)){
      errorMessageList.push("Username is already taken")
    }

    return errorMessageList
  }

  def logIn() {
    def userParams = request.JSON
    def user = User.findByUsernameAndPassword(userParams.username, userParams.password)

    if(user) {
      session["user"] = [username: user.username]
      sendUser(user)
    } else {
      response.status = 409
      sendErrorMessages(["user cannot be found with given params"])
    }
  }

  def signOut() {
    session["user"] = null
    def signOutNotification = [notification: "Signed out successfully"]
    render signOutNotification as JSON
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
