import DB from 'nedb';

const ProjectsStore = new DB({
    filename: './_db/projects.db',
    autoload: true
});

ProjectsStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

const SprintsStore = new DB({
    filename: './_db/sprints.db',
    autoload: true
});

SprintsStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

const StoriesStore = new DB({
    filename: './_db/stories.db',
    autoload: true
});

StoriesStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

const BoardsStore = new DB({
    filename: './_db/boards.db',
    autoload: true
});

BoardsStore.ensureIndex({
    fieldName: 'session_id',
    unique: true
});

const GamesStore = new DB({
    filename: './_db/games.db',
    autoload: true
});

export {
    ProjectsStore,
    SprintsStore,
    StoriesStore,
    BoardsStore,
    GamesStore
};
