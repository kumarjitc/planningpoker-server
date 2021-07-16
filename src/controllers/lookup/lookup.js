import {
    ProjectsStore,
    SprintsStore,
    Select,
} from '../../db/index';

export const TABLE_PROJECTS = 'Project';
export const TABLE_SPRINTS = 'Sprint';
export const TABLE_STORIES = 'Story';

export default class LookUp {
    async check(table, field, value) {
        switch (table) {
            case TABLE_PROJECTS:
                let data = await this.#checkProject(field, value);
                if (data && (data.length || data[field])) {
                    return true;
                }
                break;
        }

        return false;
    }

    async #checkProject(field, value) {
        return await new Select(ProjectsStore).addCondition(field, value).execute();
    }
}