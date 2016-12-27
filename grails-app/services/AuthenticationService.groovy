package agilityblogger

import org.grails.web.json.JSONObject

class AuthenticationService {
  def createUser(params) {
    def user = new User(params).save(flush: true)
  }

  def createUserErrorMsgs(userParams) {
    def errorMessageList = []

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

  def findUser(userParams) {
    return User.findByUsernameAndPassword(userParams.username, userParams.password)
  }

  def findUserErrorMsgs() {
    return ["user cannot be found with given params"]
  }

  def signOutNotification() {
    return [notification: "Signed out successfully"]
  }

  
}
