import {
    ProjectStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';

export class Projects {
    async create(document) {
        return new Insert(ProjectStore).addDocument(document).execute();
    }

    async getById(id) {
        return new Select(ProjectStore).searchById(id).execute();
    }

    async getAll() {
        return new Select(ProjectStore).execute();
    }

    async update(document, id) {
        return new Update(ProjectStore).updateById(id).addDocument(document).execute();
    }

    async deleteById(id) {
        return new Delete(ProjectStore).deleteById(id).execute();
    }
}