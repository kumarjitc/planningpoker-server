import express from 'express';
import { Sprints } from '../controllers/index';

const routeListener = express.Router();

let sprints = new Sprints();

routeListener.get('/', async (req, res, next) => {
    const projectid = req.params.projectid;

    try {
        res.send(await sprints.getAll());
    } catch (error) {
        next(error);
    }
});

routeListener.get('/project/:projectid', async (req, res, next) => {
    const projectid = req.params.projectid;

    try {
        res.send(await sprints.getAll());
    } catch (error) {
        next(error);
    }
});

routeListener.get('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await sprints.getById(id));
    } catch (error) {
        next(error);
    }
});

routeListener.post('/', async (req, res, next) => {
    try {
        res.send(await sprints.create(req.body));
    } catch (error) {
        next(error);
    }
});

routeListener.put('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await sprints.update(req.body, id));
    } catch (error) {
        next(error);
    }
});

routeListener.delete('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await sprints.deleteById(id));
    } catch (error) {
        next(error);
    }
});

export default routeListener;