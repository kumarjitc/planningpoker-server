import express from 'express';
import { Stories } from '../controllers/index';

const routeListener = express.Router();

let stories = new Stories();

routeListener.get('/', async (req, res, next) => {
    try {
        res.send(await stories.getAll());
    } catch (error) {
        next(error);
    }
});

routeListener.get('/project/:projectid/sprints/:sprintid', async (req, res, next) => {
    const projectid = req.params.projectid;
    const sprintid = req.params.sprint;

    try {
        res.send(await stories.getAll());
    } catch (error) {
        next(error);
    }
});

routeListener.get('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await stories.getById(id));
    } catch (error) {
        next(error);
    }
});

routeListener.post('/', async (req, res, next) => {
    try {
        res.send(await stories.create(req.body));
    } catch (error) {
        next(error);
    }
});

routeListener.put('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await stories.update(req.body, id));
    } catch (error) {
        next(error);
    }
});

routeListener.delete('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await stories.deleteById(id));
    } catch (error) {
        next(error);
    }
});

export default routeListener;