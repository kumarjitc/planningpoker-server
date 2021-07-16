import { ValidationError } from "./error";

export const FIELD = 'field';
export const REQUIRED = 'required';
export const LENGTH = 'length';
export const INTEGRETIY = 'integrity';

export default class Validator {
    #fields;
    #validation;

    constructor() {
        this.#validation = new ValidationError();
    }

    init(fields) {
        this.#fields = fields;

        return this;
    }

    validate(data) {
        this.#validation = new ValidationError();

        for (let field of this.#fields) {
            this.#validateField(field, data);
        }

        return this.#validation;
    }

    #validateField(field, data) {
        if (field[REQUIRED]) {
            this.#requiredValidation(field[FIELD], data);
        }
        if (field[LENGTH]) {
            this.#lengthValidation(field[FIELD], field[LENGTH], data);
        }
    }

    #requiredValidation(name, data) {
        if (!data[name]) {
            this.#validation.forRequiredValidation(name);
        }
    }

    #lengthValidation(name, length, data) {
        if (data[name] && data[name].length > length) {
            this.#validation.forLengthValidation(name, length);
        }
    }
}