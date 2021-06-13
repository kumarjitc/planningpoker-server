import {
    ProjectStore,
    Insert,
    Update
} from '../db/index';

export class Projects {
    getAll() {
        return {
            value: 'ALL PROJECTS'
        };
    }

    create(document) {
        return new Insert(ProjectStore).addDocument(document).execute();
    }

    update(document, id) {
        return new Update(ProjectStore).updateById(id).addDocument(document).execute();
    }
}