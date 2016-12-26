import Form from '../../../src/submodules/authentication/classes/form.js';
import FormField from '../../../src/submodules/authentication/classes/formField.js';
import MatchingFormField from '../../../src/submodules/authentication/classes/matchingFormField.js';

import FormSubmission from '../../../src/submodules/authentication/classes/formSubmission.js';
import FormValidation from '../../../src/submodules/authentication/classes/formValidation.js';
import FormAuthor from '../../../src/submodules/authentication/classes/formAuthor.js';

describe("form author", () => {
  let form, formField, formAuthor;

  beforeEach(() => {
    form = new Form({
      FormAuthor: FormAuthor,
      FormSubmission: FormSubmission,
      FormValidation: FormValidation
    });

    formField = new FormField({
      name: "fieldName",
      errorChecks: [],
      type: "type",
      icon: "icon"
    });

    formAuthor = form.author;
  });

  describe("#constructor", () => {
    it("Should construct with a form", () => {
      expect(formAuthor.form).toEqual(jasmine.any(Form));
    });
  });

  describe("#writeField", () => {
    it("it should push a form field into the form's fields list", () => {
      formAuthor.writeField(formField);
      expect(form.fieldsList).toEqual([formField]);
      expect(form.fieldsList.length).toEqual(1);
    });
  });

  describe("#writeFieldWithCheck", () => {
    it("should push a field and a matching form field with similar names into the field's list", () => {
      formAuthor.writeFieldWithCheck(formField);
      expect(form.fieldsList[0]).toEqual(formField);
      expect(form.fieldsList[1].name).toEqual("fieldNameConfirm");
      expect(form.fieldsList.length).toEqual(2);
    });
  });
});
