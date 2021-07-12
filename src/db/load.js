import DB from 'nedb';

const ProjectStore = new DB({
    filename: './_db/projects.db',
    autoload: true
});

ProjectStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

export {
    ProjectStore
};
