import {
    ProjectsStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';

import { ValidationError } from './error';

const fields = [
    'name',
    'desc',
    'owner'
];

export class Projects {
    constructor() {
        this.validation = new ValidationError();
    }

    async create(document) {
        fields.forEach(field => {
            if (!document[field]) {
                this.validation.forRequiredValidation(field);
            }
        });

        if (this.validation.hasError()) {
            return Promise.reject(this.validation);
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