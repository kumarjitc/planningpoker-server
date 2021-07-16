import Validator from "../validators";

export default class BaseController {
    constructor() {
        this.validator = new Validator();
    }

    initValidator(fieldMapping) {
        this.validator.init(fieldMapping);
    }
}