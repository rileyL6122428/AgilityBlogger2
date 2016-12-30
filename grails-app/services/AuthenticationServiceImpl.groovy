package agilityblogger

import org.grails.web.json.JSONObject


class AuthenticationServiceImpl implements AuthenticationService {
  User createUser(params) {
    new User(params).save(flush: true)
  }

  List createUserErrorMsgs(userParams) {
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

    errorMessageList
  }

  User findUser(userParams) {
    User.findByUsernameAndPassword(userParams.username, userParams.password)
  }

  List findUserErrorMsgs() {
    ["user cannot be found with given params"]
  }

  User findSessionUser(session) {
    (session.user) ? User.findByUsername(session.user.username) : null
  }

  List findSessionUserErrorMsgs() {
    ["User is not signed in"];
  }
}
