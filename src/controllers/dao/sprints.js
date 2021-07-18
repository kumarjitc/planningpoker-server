import {
    SprintsStore,
    Select
} from '../../db/index';
import BaseController from './base';

import { FIELD, FOREIGN_FIELD, INTEGRETIY, LENGTH, REQUIRED, TABLE } from '../validators';
import { TABLE_PROJECTS } from '../lookup/lookup';

const FIELD_MAP = [
    { [FIELD]: 'name', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 15, [REQUIRED]: true },
    {
        [FIELD]: 'project',
        [REQUIRED]: true,
        [INTEGRETIY]: {
            [FOREIGN_FIELD]: '_id',
            [TABLE]: TABLE_PROJECTS
        }
    },
];

export class Sprints extends BaseController {
    constructor() {
        super(SprintsStore);
        this.initValidator(FIELD_MAP);
    }

    async getByProject(projectid) {
        return new Select(SprintsStore).addCondition('projectid', projectid).execute();
    }
}