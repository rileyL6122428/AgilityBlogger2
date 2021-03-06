import ErrorCheck from '../../../src/submodules/authentication/classes/errorCheck.js';
import FormField from '../../../src/submodules/authentication/classes/formField.js';
import MatchingFormField from '../../../src/submodules/authentication/classes/matchingFormField.js';

describe("MathcingFormField", () => {

  let sampleFormField = new FormField({name: "sample field"});

  let sampleMatchingFormField;

  beforeEach(() => {
    sampleMatchingFormField = new MatchingFormField({
      name: "sample matching field",
      dependantField: sampleFormField
    });
 });

 describe("#updateErrors", () => {
   it("should add an error to the form field when it does not match its dependant field", () => {
     sampleFormField.value = "hello";
     sampleMatchingFormField.value = "olleh";
     sampleMatchingFormField.updateErrors();

     expect(sampleMatchingFormField.errors).toEqual(["Does not match sample field"]);
   });

   it("should not add an error to the form field when it does not match it dependant field", () => {
     sampleFormField.value = "hello";
     sampleMatchingFormField.value = "hello";
     sampleMatchingFormField.updateErrors();

     expect(sampleMatchingFormField.errors).toEqual([]);
   });
 });
});
