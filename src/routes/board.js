import express from 'express';
import { Boards } from '../controllers/index';

const routeListener = express.Router();

let boards = new Boards();

routeListener.get('/', async (req, res, next) => {
    try {
        res.send(await boards.getAll());
    } catch (error) {
        next(error);
    }
});

routeListener.get('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await boards.getById(id));
    } catch (error) {
        next(error);
    }
});

routeListener.get('/project/:projectid/sprint/:sprintid', async (req, res, next) => {
    const project = req.params.projectid;
    const sprint = req.params.sprintid;

    try {
        res.send(await boards.getBySprintAndProject(project, sprint));
    } catch (error) {
        next(error);
    }
});

routeListener.post('/', async (req, res, next) => {
    try {
        res.send(await boards.create(req.body));
    } catch (error) {
        next(error);
    }
});

routeListener.put('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await boards.update(req.body, id));
    } catch (error) {
        next(error);
    }
});

routeListener.delete('/id/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        res.send(await boards.deleteById(id));
    } catch (error) {
        next(error);
    }
});

export default routeListener;