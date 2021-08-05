import {
    Insert,
    Update,
    Select,
    Delete
} from '../../db/index';
import { OperationSuccess } from '../success';
import Validator from '../validators';

export default class BaseController {
    constructor(dbStore) {
        this.validator = new Validator();
        this.dbStore = dbStore;
    }

    async create(document) {
        const validation = await this.validator.validate(document);

        if (validation.hasError()) {
            return Promise.reject(validation);
        }

        return new Insert(this.dbStore).addDocument(document).execute();
    }

    async getById(id) {
        return new Select(this.dbStore).searchById(id).execute();
    }

    async getAll() {
        return new Select(this.dbStore).execute();
    }

    async update(document, id) {
        const validation = await this.validator.validate(document);

        if (validation.hasError()) {
            return Promise.reject(validation);
        }

        return new OperationSuccess()
            .with(await new Update(this.dbStore).updateById(id).addDocument(document).execute())
            .getMessage();
    }

    async deleteById(id) {
        return new OperationSuccess()
            .with(await new Delete(this.dbStore).deleteById(id).execute())
            .getMessage();
    }

    initValidator(fieldMapping) {
        this.validator.init(fieldMapping);
    }
}