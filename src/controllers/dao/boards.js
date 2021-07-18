import {
    BoardsStore,
    Select
} from '../../db/index';
import BaseController from './base';

import { DATE_FORMAT, FIELD, FOREIGN_FIELD, INTEGRETIY, LENGTH, PATTERN, REQUIRED, TABLE } from '../validators';
import { TABLE_PROJECTS, TABLE_SPRINTS } from '../lookup/lookup';

const FIELD_MAP = [
    { [FIELD]: 'session_id', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 50, [REQUIRED]: true },
    { [FIELD]: 'date', [LENGTH]: 10, [REQUIRED]: true, [PATTERN]: DATE_FORMAT },
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

export class Boards extends BaseController {
    constructor() {
        super(BoardsStore);
        this.initValidator(FIELD_MAP);
    }

    async getBySprintAndProject(project, sprint) {
        return new Select(BoardsStore).addCondition('project', project).addCondition('sprint', sprint).execute();
    }
}