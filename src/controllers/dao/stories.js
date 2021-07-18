import {
    StoriesStore,
    Select
} from '../../db/index';

import { FIELD, FOREIGN_FIELD, INTEGRETIY, LENGTH, REQUIRED, TABLE } from '../validators';
import { TABLE_PROJECTS, TABLE_SPRINTS } from '../lookup/lookup';
import BaseController from './base';

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
    {
        [FIELD]: 'sprint',
        [REQUIRED]: true,
        [INTEGRETIY]: {
            [FOREIGN_FIELD]: '_id',
            [TABLE]: TABLE_SPRINTS
        }
    },
];

export class Stories extends BaseController {
    constructor() {
        super(StoriesStore);
        this.initValidator(FIELD_MAP);
    }
}