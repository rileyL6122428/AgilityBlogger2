###DESCRIPTION
Sign in page is a standard sign page/form with three fields: username, password,
password confirm. Each form field will start empty and with no special
highlighting. When a form receives input and is unfocused, the form will provide
feedback as to wether an input is ready for submission. Users can also navigate
from sign in to login

###PAGE STATE
1. username
2. usernameErrorsMsgs
3. shouldShowUsernameErrors
  usernameClass

4. password
5. passwordErrorMsgs
6. shouldShowPasswordErrors
  passwordClass

7. passwordConfirm
8. passwordConfirmErrorMsgs  
9. shouldShowPasswordConfirmErrors
  passwordConfirmClass

###METHODS
1. setUsernameErrors
2. setPasswordErrors
3. setPasswordConfirmErrors

4. showUsernameFeedback
5. showPasswordFeedback
6. showPasswordConfirmFeedback

7. updateUsernameStatus
8. updatePasswordStatus
9. updatePasswordConfirmStatus
10. submitCredentials
