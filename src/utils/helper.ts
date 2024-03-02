import { Validator } from "jsonschema";

const validator = new Validator();

export function validateSchema(response: any, schemaToValidate: any) {
    const validationResult = validator.validate(response.body, schemaToValidate);
    expect(validationResult.valid).toBe(true);

    if (!validationResult.valid) {
        console.error('Validation errors:', validationResult.errors);
      }  
}