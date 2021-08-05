import { RESPONSE_KEYS } from "../utils";

export class OperationSuccess {
    #message;

    with(message) {
        this.#message = message;

        return this;
    }

    getMessage() {
        const [, MESSAGE_KEY] = [...RESPONSE_KEYS];

        return {
            [MESSAGE_KEY]: this.#message
        };
    }
}