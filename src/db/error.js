import { RESPONSE_KEYS } from "../utils";

const RESPONSE_STATUS_CODE = 500;

export class DBError extends Error {
    static RECORD_NOT_FOUND = 'Record Not Found';

    constructor(operation, message) {
        super(message);
        this.operation = operation || '';
    }

    forOperation(operation) {
        this.operation = operation;

        return this;
    }

    with(message) {
        this.message = message;

        return this;
    }

    getMessage() {
        const [MESSAGE_KEY] = [...RESPONSE_KEYS];

        return {
            [MESSAGE_KEY]: `${this.operation} Exited With Error - ${this.message}`
        };
    }

    getErrorCode() {
        return RESPONSE_STATUS_CODE;
    }
}