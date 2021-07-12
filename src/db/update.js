export class Update {
    constructor(db) {
        this.db = db;
        this.doc = {};
        this.condition = {};
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
        this.condition['_id'] = id;

        return this;
    }

    async execute() {
        return new Promise((resolve, reject) => {
            this.db.update(this.condition, this.doc, { multi: true }, (error, numReplaced) => {
                if (error) {
                    console.log(error);
                }

                if (numReplaced === 0) {
                    throw new Error('No Records Updated');
                } else {
                    resolve(`${numReplaced} Records Updated`);
                }
            });
        });
    }
}
