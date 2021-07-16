import { RESPONSE_KEYS } from '../utils'

const RESPONSE_STATUS_CODE = 500;
const REQUIRED_MESSAGE = 'Cannot Be Blank';

export class ValidationError extends Error {
    faliedValidation = new Map();
    constructor(e) {
        super('Field Validations Failed');
    }

    forRequiredValidation(field) {
        this.faliedValidation.set(field, REQUIRED_MESSAGE);
    }

    with(message) {
        this.message = message;

        return this;
    }

    hasError() {
        return this.faliedValidation.size > 0;
    }

    getMessage() {
        const [MESSAGE_KEY] = [...RESPONSE_KEYS];

        return {
            [MESSAGE_KEY]: this.message,
            validations: Object.fromEntries(this.faliedValidation)
        };
    }

    getErrorCode() {
        return RESPONSE_STATUS_CODE;
    }
}