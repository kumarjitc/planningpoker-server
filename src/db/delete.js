export class Delete {
    constructor(db) {
        this.db = db;
        this.condition = {};
    }

    deleteById(id) {
        this.condition['_id'] = id;

        return this;
    }

    addCondition(field, name) {
        this.condition[field] = name;

        return this;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.db.remove(this.condition, { multi: true }, function (error, numRemoved) {
                if (error) {
                    reject(error);
                }

                if (numRemoved === 0) {
                    throw new Error('No Records Deleted');
                } else {
                    resolve(`${numRemoved} Records Deletec`);
                }
            });
        });
    }
}
