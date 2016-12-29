import Form from '../classes/form.js';
import FormField from '../classes/formField.js';
import authErrorChecks from '../constants/authErrorChecks';
import FormSubmission from '../classes/formSubmission.js';
import FormValidation from '../classes/FormValidation.js';
import FormAuthor from '../classes/formAuthor.js';

function FormFactory() {

  function _blankForm() {
    return new Form({
      FormAuthor: FormAuthor,
      FormSubmission: FormSubmission,
      FormValidation: FormValidation
    })
  }

  function _usernameFormField() {
    return new FormField ({
      name: "username",
      errorChecks: [
        authErrorChecks.tooShort,
        authErrorChecks.tooLong,
        authErrorChecks.dashesPresent,
        authErrorChecks.spacesPresent
      ],
      type: "text",
      icon: "glyphicon glyphicon-credit-card"
    });
  }

  function _passwordFormField() {
    return new FormField ({
      name: "password",
      errorChecks: [authErrorChecks.tooShort, authErrorChecks.tooLong],
      type: "password",
      icon: "glyphicon glyphicon-lock"
    })
  }

  return ({
    newSignUpForm: () => {
      let form = _blankForm();
      form.addField(_usernameFormField());
      form.addFieldWithCheck(_passwordFormField());
      return form;
    },

    newLoginForm: () => {
      let form = _blankForm();
      form.addField(_usernameFormField());
      form.addField(_passwordFormField());
      return form;
    }

  });
}

export default FormFactory;
