import {
    StoriesStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';

export class Stories {
    async create(document) {
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