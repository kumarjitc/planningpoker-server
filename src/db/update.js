import { ID } from './constants';
import { DBError } from './error';

export class Update {
    constructor(db) {
        this.db = db;
        this.doc = {};
        this.condition = {};
        this.error = new DBError().forOperation('UPDATE');
    }

    addDocument(doc) {
        this.doc = doc;

        return this;
    }

    addField(field, value) {
        this.doc[field] = value;

        return this;
    }

    addCondition(condition) {
        this.condition = condition;

        return this;
    }

    updateById(id) {
        this.condition[ID] = id;

        return this;
    }

    async execute() {
        return new Promise((resolve, reject) => {
            this.db.update(this.condition, this.doc, { multi: true }, (error, numReplaced) => {
                if (error) {
                    reject(this.error.with(error));
                }

                if (numReplaced === 0) {
                    reject(this.error.with('No Records Updated'));
                } else {
                    resolve(`${numReplaced} Records Updated`);
                }
            });
        });
    }
}
