import { ID } from './constants';
import { DBError } from './error';

export class Select {
    constructor(db) {
        this.db = db;
        this.condition = {};
        this.error = new DBError().forOperation('RETRIEVE');
    }

    searchById(id) {
        this.condition[ID] = id;

        return this;
    }

    addCondition(field, value) {
        this.condition[field] = value;

        return this;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.db.find(this.condition, (error, docs) => {
                if (error) {
                    reject(this.error.with(error));
                }

                resolve(this.condition.hasOwnProperty(ID) ? docs[0] : docs);
            });
        });
    }
}
