import {
    SprintsStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';

export class Sprints {
    async create(document) {
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