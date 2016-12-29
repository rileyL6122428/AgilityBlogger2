package agilityblogger

import org.grails.web.json.JSONObject

interface AuthenticationService {

  User createUser(params)
  List createUserErrorMsgs(userParams)

  User findUser(userParams)
  List findUserErrorMsgs()

  User findSessionUser(session)
  List findSessionUserErrorMsgs()
  
}
