import Form from '../classes/form.js';
import FormField from '../classes/formField.js';
import signUpErrorChecks from '../constants/authErrorChecks';

function SignUpForm() {

  function newForm() {
    let form = new Form();
    
    form.addField( new FormField ({
      name: "username",
      errorChecks: [
        signUpErrorChecks.tooShort,
        signUpErrorChecks.tooLong,
        signUpErrorChecks.dashesPresent,
        signUpErrorChecks.spacesPresent
      ],
      type: "text",
      icon: "glyphicon glyphicon-credit-card"
    }));

    form.addFieldWithCheck( new FormField ({
      name: "password",
      errorChecks: [signUpErrorChecks.tooShort, signUpErrorChecks.tooLong],
      type: "password",
      icon: "glyphicon glyphicon-lock"
    }));

    return form;
  }

  return ({ newForm });
}

export default SignUpForm;
