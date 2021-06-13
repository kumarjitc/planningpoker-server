import DB from 'nedb';

const projectStore = new DB({
    filename: './data/projects.db',
    autoload: true
});

projectStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

export {
    projectStore
};
