import { RESPONSE_KEYS } from '../utils'

const RESPONSE_STATUS_CODE = 500;

const REQUIRED_VALIDATION_KEY = 'required';
const LENGTH_VALIDATION_KEY = 'length';

const REQUIRED_MESSAGE = 'Cannot Be Blank';
const LENGTH_MESSAGE = 'Length Cannot Be More Than -';

export class ValidationError extends Error {
    requiredValidation = new Map();
    lengthValidation = new Map();
    constructor(e) {
        super('Field Validations Failed');
    }

    forRequiredValidation(field) {
        this.requiredValidation.set(field, REQUIRED_MESSAGE);
    }

    forLengthValidation(field, length) {
        this.lengthValidation.set(field, `${LENGTH_MESSAGE} ${length}`);
    }

    with(message) {
        this.message = message;

        return this;
    }

    hasError() {
        return this.requiredValidation.size > 0
            || this.lengthValidation.size > 0;
    }

    getMessage() {
        const [MESSAGE_KEY] = [...RESPONSE_KEYS];

        return {
            [MESSAGE_KEY]: this.message,
            validations: {
                ...(this.requiredValidation.size && { [REQUIRED_VALIDATION_KEY]: { ...Object.fromEntries(this.requiredValidation) } }),
                ...(this.lengthValidation.size && { [LENGTH_VALIDATION_KEY]: { ...Object.fromEntries(this.lengthValidation) } })
            }
        };
    }

    getErrorCode() {
        return RESPONSE_STATUS_CODE;
    }
}