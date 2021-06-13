import DB from 'nedb';

const projectStore = new DB({
    filename: './db/projects.db',
    autoload: true
});

projectStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

export {
    projectStore
};
