import express from 'express';
import { Projects } from '../controllers/index';

const routeListener = express.Router();

let projects = new Projects();

routeListener.get('/', async (req, res, next) => {
    try {
        res.send(await projects.getAll());
    } catch (error) {
        next(error);
    }
});

routeListener.get('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await projects.getById(id));
    } catch (error) {
        next(error);
    }
});

routeListener.post('/', async (req, res, next) => {
    try {
        res.send(await projects.create(req.body));
    } catch (error) {
        next(error);
    }
});

routeListener.put('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await projects.update(req.body, id));
    } catch (error) {
        next(error);
    }
});

routeListener.delete('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await projects.deleteById(id));
    } catch (error) {
        next(error);
    }
});

export default routeListener;