import {
    SprintsStore,
    Insert,
    Update,
    Select,
    Delete
} from '../../db/index';
import BaseController from './base';

import { FIELD, FOREIGN_FIELD, INTEGRETIY, LENGTH, REQUIRED, TABLE } from '../validators';

const FIELD_MAP = [
    { [FIELD]: 'name', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 15, [REQUIRED]: true },
    {
        [FIELD]: 'project',
        [REQUIRED]: true,
        [INTEGRETIY]: {
            [FOREIGN_FIELD]: '_id',
            [TABLE]: 'PROJECTS'
        }
    },
];

export class Sprints extends BaseController {
    constructor() {
        super();
        this.initValidator(FIELD_MAP);
    }

    async create(document) {
        const validation = this.validator.validate(document);

        if (validation.hasError()) {
            return Promise.reject(validation);
        }

        return new Insert(SprintsStore).addDocument(document).execute();
    }

    async getById(id) {
        return new Select(SprintsStore).searchById(id).execute();
    }

    async getByProject(projectid) {
        return new Select(SprintsStore).addCondition('projectid', projectid).execute();
    }

    async getAll() {
        return new Select(SprintsStore).execute();
    }

    async update(document, id) {
        return new Update(SprintsStore).updateById(id).addDocument(document).execute();
    }

    async deleteById(id) {
        return new Delete(SprintsStore).deleteById(id).execute();
    }
}