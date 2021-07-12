const ID = '_id';

export class Select {
    constructor(db) {
        this.db = db;
        this.condition = {};
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
        return new Promise((resolve, _reject) => {
            this.db.find(this.condition, (error, docs) => {
                if (error) {
                    console.log(error);
                }

                resolve(this.condition.hasOwnProperty(ID) ? docs[0] : docs);
            });
        });
    }
}
