import {
    ProjectsStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';

export class Projects {
    async create(document) {
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