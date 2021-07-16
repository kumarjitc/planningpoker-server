import {
    ProjectsStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';

import Validator, { FIELD, LENGTH, REQUIRED } from './validators';

/* const FIELD_VALIDATION = {
    [VALIDATOR_REQUIRED]: ['name', 'desc', 'owner']
}; */
const FIELD_VALIDATION = [
    { [FIELD]: 'name', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'owner', [REQUIRED]: true },
];

export class Projects {
    constructor() {
        this.validator = new Validator().init(FIELD_VALIDATION);
    }

    async create(document) {
        const validation = this.validator.validate(document);

        console.log(validation);
        if (validation.hasError()) {
            return Promise.reject(validation);
        }

        return new Insert(ProjectsStore).addDocument(document).execute();
    }

    async getById(id) {
        return new Select(ProjectsStore).searchById(id).execute();
    }

    async getAll() {
        return new Select(ProjectsStore).execute();
    }

    async update(document, id) {
        return new Update(ProjectsStore).updateById(id).addDocument(document).execute();
    }

    async deleteById(id) {
        return new Delete(ProjectsStore).deleteById(id).execute();
    }
}