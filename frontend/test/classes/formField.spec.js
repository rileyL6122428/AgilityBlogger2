import FormField from '../../src/classes/formField.js';
import ErrorCheck from '../../src/classes/errorCheck.js'

describe("FormField", () => {
  let sampleErrorCheck = new ErrorCheck(
    (value) => { return value.length === 0; },
    "Too short (value length must not be empty)"
  );

  let sampleFormField;

  beforeEach(() => {
    sampleFormField = new FormField({
      name: "field name",
      errorChecks: [sampleErrorCheck],
      type: "type",
      icon: "icon"
    });
  });

  describe("#constructor", () => {
    it("should instantiate with an empty field value", () => {
      expect(sampleFormField.value).toEqual("");
    });

    it("should instantiate without pending errors", () => {
      expect(sampleFormField.errors).toEqual([]);
    });

    it("should instantiate with assigned field values", () => {
      expect(sampleFormField.name).toEqual("field name");
      expect(sampleFormField.type).toEqual("type");
      expect(sampleFormField.icon).toEqual("icon");
    });
  });


  describe("#updateErrors", () => {
    it("should set errors when errors are present", () => {
      sampleFormField.updateErrors();
      expect(sampleFormField.errors).toEqual(["Too short (value length must not be empty)"]);
    });

    it("should clear errors when all errorChecks pass", () => {
      sampleFormField.value = "value"
      sampleFormField.updateErrors();
      expect(sampleFormField.errors).toEqual([]);
    });
  });

  describe("#errorsPresent", () => {
    it("should return true when errors are present", () => {
      sampleFormField.updateErrors();
      expect(sampleFormField.errorsPresent()).toBe(true);
    });

    it("should return false when errors are not present", () => {
      sampleFormField.value = "value"
      sampleFormField.updateErrors();
      expect(sampleFormField.errorsPresent()).toBe(false);
    });
  });

  describe("#getError", () => {
    it("should return an error message when errors are present", () => {
      sampleFormField.updateErrors();
      expect(sampleFormField.getError()).toEqual(sampleErrorCheck.msg);
    });

    it("should return undefined when errors are not present", () => {
      sampleFormField.value = "value"
      sampleFormField.updateErrors();
      expect(sampleFormField.getError()).toBe(undefined);
    });
  });
});
