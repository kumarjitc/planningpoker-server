import { ID } from "./constants";
import { DBError } from "./error";

export class Delete {
    constructor(db) {
        this.db = db;
        this.condition = {};
        this.error = new DBError().forOperation('DELETE');
    }

    deleteById(id) {
        this.condition[ID] = id;

        return this;
    }

    addCondition(field, name) {
        this.condition[field] = name;

        return this;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.db.remove(this.condition, { multi: true }, (error, numRemoved) => {
                if (error) {
                    reject(this.error.with(error));
                }

                if (!numRemoved) {
                    reject(this.error.with(`No Records Removed For - ${this.condition[ID]}`));
                } else {
                    resolve(`${numRemoved} Records Deleted`);
                }
            });
        });
    }
}
