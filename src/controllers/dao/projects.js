import {
    ProjectsStore
} from '../../db';
import BaseController from './base';

import { FIELD, LENGTH, REQUIRED } from '../validators';

const FIELD_MAP = [
    { [FIELD]: 'name', [LENGTH]: 15, [REQUIRED]: true },
    { [FIELD]: 'desc', [LENGTH]: 250, [REQUIRED]: true },
    { [FIELD]: 'owner', [LENGTH]: 50, [REQUIRED]: true },
];

export class Projects extends BaseController {
    constructor() {
        super(ProjectsStore);
        this.initValidator(FIELD_MAP);
    }
}