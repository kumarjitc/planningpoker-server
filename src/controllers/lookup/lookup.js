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
                let project = await this.#checkProject(field, value);
                if (project && (project.length || project[field])) {
                    return true;
                }
                break;
            case TABLE_SPRINTS:
                let sprint = await this.#checkSprint(field, value);
                console.log(sprint);
                if (sprint && (sprint.length || sprint[field])) {
                    return true;
                }
                break;
        }

        return false;
    }

    async #checkProject(field, value) {
        return await new Select(ProjectsStore).addCondition(field, value).execute();
    }

    async #checkSprint(field, value) {
        return await new Select(SprintsStore).addCondition(field, value).execute();
    }
}