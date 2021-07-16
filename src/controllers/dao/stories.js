import {
    StoriesStore,
    Insert,
    Update,
    Select,
    Delete
} from '../../db/index';

import { FIELD, FOREIGN_FIELD, INTEGRETIY, LENGTH, REQUIRED, TABLE } from '../validators';
import { TABLE_PROJECTS, TABLE_SPRINTS } from '../lookup/lookup';
import BaseController from './base';

const FIELD_MAP = [
    { [FIELD]: 'name', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 15, [REQUIRED]: true },
    {
        [FIELD]: 'project',
        [REQUIRED]: true,
        [INTEGRETIY]: {
            [FOREIGN_FIELD]: '_id',
            [TABLE]: TABLE_PROJECTS
        }
    },
    {
        [FIELD]: 'sprint',
        [REQUIRED]: true,
        [INTEGRETIY]: {
            [FOREIGN_FIELD]: '_id',
            [TABLE]: TABLE_SPRINTS
        }
    },
];

export class Stories extends BaseController {
    constructor() {
        super();
        this.initValidator(FIELD_MAP);
    }

    async create(document) {
        const validation = await this.validator.validate(document);

        if (validation.hasError()) {
            return Promise.reject(validation);
        }

        return new Insert(StoriesStore).addDocument(document).execute();
    }

    async getById(id) {
        return new Select(StoriesStore).searchById(id).execute();
    }

    async getAll() {
        return new Select(StoriesStore).execute();
    }

    async update(document, id) {
        return new Update(StoriesStore).updateById(id).addDocument(document).execute();
    }

    async deleteById(id) {
        return new Delete(StoriesStore).deleteById(id).execute();
    }
}