import { ValidationError } from "./error";
import LookUp from "./lookup/lookup";

export const FIELD = 'field';
export const TABLE = 'table';
export const FOREIGN_FIELD = 'foreign_field';

export const REQUIRED = 'required';
export const LENGTH = 'length';
export const INTEGRETIY = 'integrity';
export const PATTERN = 'pattern';

export const DATE_FORMAT = '([12]\\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\\d|3[01]))';

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
        if (field[PATTERN]) {
            this.#patternValidation(field[FIELD], field[PATTERN], data);
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
        if (lookup[FOREIGN_FIELD] && lookup[TABLE] && data[name]) {
            try {
                await new LookUp().check(lookup[TABLE], lookup[FOREIGN_FIELD], data[name]);
            } catch (error) {
                this.#validation.forIntegrityValidation(name, data[name]);
            }
        }
    }

    #patternValidation(name, pattern, data) {
        let matcher = new RegExp(pattern, 'i');
        if (data[name] && !(data[name]).match(matcher)) {
            this.#validation.forPatternValidation(name);
        }
    }
}