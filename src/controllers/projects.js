import {
    ProjectStore,
    Insert,
    Update,
    Select,
    Delete
} from '../db/index';
import { projectStore } from '../db/load';

export class Projects {
    getAll() {
        return {
            value: 'ALL PROJECTS'
        };
    }

    create(document) {
        return new Insert(ProjectStore).addDocument(document).execute();
    }

    getById(id) {
        return new Select(projectStore).searchById(id).execute();
    }

    getAll() {
        return new Select(projectStore).execute();
    }

    update(document, id) {
        return new Update(ProjectStore).updateById(id).addDocument(document).execute();
    }

    deleteById(id) {
        return new Delete(ProjectStore).deleteById(id).execute();
    }
}