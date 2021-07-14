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
        return `${this.operation} Exited With Error - ${this.message}`;
    }

    getErrorCode() {
        return RESPONSE_STATUS_CODE;
    }
}