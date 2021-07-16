import {
    ProjectsStore,
    Insert,
    Update,
    Select,
    Delete
} from '../../db/index';
import BaseController from './base';

import { FIELD, LENGTH, REQUIRED } from '../validators';

const FIELD_MAP = [
    { [FIELD]: 'name', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 50, [REQUIRED]: true },
    { [FIELD]: 'owner', [REQUIRED]: true },
];

export class Projects extends BaseController {
    constructor() {
        super();
        this.initValidator(FIELD_MAP);
    }

    async create(document) {
        const validation = await this.validator.validate(document);

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