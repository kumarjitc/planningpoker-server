import { ValidationError } from "./error";
import LookUp from "./lookup/lookup";

export const FIELD = 'field';
export const TABLE = 'table';
export const FOREIGN_FIELD = 'foreign_field';

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

    async validate(data) {
        this.#validation = new ValidationError();

        for (let field of this.#fields) {
            await this.#validateField(field, data);
        }

        return this.#validation;
    }

    async #validateField(field, data) {
        if (field[REQUIRED]) {
            this.#requiredValidation(field[FIELD], data);
        }
        if (field[LENGTH]) {
            this.#lengthValidation(field[FIELD], field[LENGTH], data);
        }
        if (field[INTEGRETIY]) {
            await this.#integrityValidation(field[FIELD], field[INTEGRETIY], data);
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

    async #integrityValidation(name, lookup, data) {
        if (lookup[FOREIGN_FIELD] && lookup[TABLE]) {
            try {
                await new LookUp().check(lookup[TABLE], lookup[FOREIGN_FIELD], data[name]);
            } catch (error) {
                this.#validation.forIntegrityValidation(name, data[name]);
            }
        }
    }
}