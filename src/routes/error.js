import { DBError } from "../db";

const TYPE_ERROR_MESSAGE = 'Type Not Supported Yet';
const RESPONSE_STATUS_CODE = 404;

export const errorHandler = (error, res) => {
    res.status(error.getErrorCode()).send(error);
}

export class UndefinedSetupError extends Error {
    static RESPONSE_STATUS_CODE = 403;

    constructor(type) {
        super();
        this.message = TYPE_ERROR_MESSAGE || '';
        this.type = type || '';
    }

    getErrorCode() {
        return RESPONSE_STATUS_CODE;
    }
}