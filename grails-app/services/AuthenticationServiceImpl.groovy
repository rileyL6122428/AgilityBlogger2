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

    return errorMessageList
  }

  User findUser(userParams) {
    return User.findByUsernameAndPassword(userParams.username, userParams.password)
  }

  List findUserErrorMsgs() {
    return ["user cannot be found with given params"]
  }

  User findSessionUser(session) {
    return User.findByUsername(session.user.username)
  }

  List findSessionUserErrorMsgs() {
    return ["User not signed in"];
  }
}
