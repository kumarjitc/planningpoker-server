import express from 'express';
import { PROJECT } from '../utils/constants';
import { Projects } from '../controllers/index';
import { UndefinedSetupError } from './error';

const routeListener = express.Router();

let projects = new Projects();

routeListener.get('/:type/', async (req, res, next) => {
    const type = req.params.type;

    try {
        switch (type) {
            case PROJECT:
                res.send(await projects.getAll());
                break;
            default:
                console.log(type);
                throw new UndefinedSetupError(type);
        }
    } catch (error) {
        next(error);
    }
});

routeListener.get('/:type/id/:id', async (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;

    try {
        switch (type) {
            case PROJECT:
                res.send(await projects.getById(id));
                break;
            default:
                throw new UndefinedSetupError(type);
        }
    } catch (error) {
        next(error);
    }
});

routeListener.post('/:type/', async (req, res, next) => {
    const type = req.params.type;

    try {
        switch (type) {
            case PROJECT:
                res.send(await projects.create(req.body));
                break;
            default:
                throw new UndefinedSetupError(type);
        }
    } catch (error) {
        next(error);
    }
});

routeListener.put('/:type/id/:id', async (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;

    try {
        switch (type) {
            case PROJECT:
                res.send(await projects.update(req.body, id));
                break;
            default:
                throw new UndefinedSetupError(type);
        }
    } catch (error) {
        next(error);
    }
});

routeListener.delete('/:type/id/:id', async (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;

    try {
        switch (type) {
            case PROJECT:
                res.send(await projects.deleteById(id));
                break;
            default:
                throw new UndefinedSetupError(type);
        }
    } catch (error) {
        next(error);
    }
});

export default routeListener;