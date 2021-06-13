export class Insert {
    constructor(db) {
        this.db = db;
        this.doc = {};
    }

    addDocument(doc) {
        this.doc = doc;

        return this;
    }

    addField(field, value) {
        this.doc[field] = value;

        return this;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.db.insert(this.doc, (error, inserted) => {
                if (error) {
                    console.log('TEST', error);
                }
                resolve(inserted);
            });
        });
    }
}