import { RESPONSE_KEYS } from '../utils'

const RESPONSE_STATUS_CODE = 500;

const REQUIRED_VALIDATION_KEY = 'required';
const LENGTH_VALIDATION_KEY = 'length';
const INTEGRITY_VALIDATION_KEY = 'integrity';
const PATTERN_VALIDATION_KEY = 'pattern';

const REQUIRED_MESSAGE = 'Cannot Be Blank';
const LENGTH_MESSAGE = 'Length Cannot Be More Than -';
const INTEGRITY_MESSAGE = 'Cannot Find Matching Values - ';
const PATTERN_MESSAGE = 'Not A Valid Format - ';

export class ValidationError extends Error {
    requiredValidation = new Map();
    lengthValidation = new Map();
    integrityValidation = new Map();
    patternValidation = new Map();

    constructor() {
        super('Field Validations Failed');
    }

    forRequiredValidation(field) {
        this.requiredValidation.set(field, REQUIRED_MESSAGE);
    }

    forLengthValidation(field, length) {
        this.lengthValidation.set(field, `${LENGTH_MESSAGE} ${length}`);
    }

    forIntegrityValidation(field, value) {
        this.integrityValidation.set(field, `${INTEGRITY_MESSAGE} ${value} For ${field}`);
    }

    forPatternValidation(field) {
        this.patternValidation.set(field, `${PATTERN_MESSAGE} ${field}`);
    }

    with(message) {
        this.message = message;

        return this;
    }

    hasError() {
        return this.requiredValidation.size > 0
            || this.lengthValidation.size > 0
            || this.integrityValidation.size > 0
            || this.patternValidation.size > 0;
    }

    getMessage() {
        const [MESSAGE_KEY] = [...RESPONSE_KEYS];

        return {
            [MESSAGE_KEY]: this.message,
            validations: {
                ...(this.requiredValidation.size && { [REQUIRED_VALIDATION_KEY]: { ...Object.fromEntries(this.requiredValidation) } }),
                ...(this.lengthValidation.size && { [LENGTH_VALIDATION_KEY]: { ...Object.fromEntries(this.lengthValidation) } }),
                ...(this.integrityValidation.size && { [INTEGRITY_VALIDATION_KEY]: { ...Object.fromEntries(this.integrityValidation) } }),
                ...(this.patternValidation.size && { [PATTERN_VALIDATION_KEY]: { ...Object.fromEntries(this.patternValidation) } })
            }
        };
    }

    getErrorCode() {
        return RESPONSE_STATUS_CODE;
    }
}