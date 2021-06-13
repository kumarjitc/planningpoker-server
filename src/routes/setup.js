import express from 'express';
import { PROJECT } from '../utils/constants';
import { Projects } from '../controllers/index'

const routeListener = express.Router();

routeListener.use((req, res, next) => {
    console.log('Request Received At - Setup - ', Date.now());
    next();
});

let projects = new Projects();

routeListener.get('/:type/', async (req, res) => {
    const type = req.params.type;

    switch (type) {
        case PROJECT:
            res.send(await projects.getAll());
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.get('/:type/id/:id', async (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    switch (type) {
        case PROJECT:
            res.send(await projects.getById(id));
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.post('/:type/', async (req, res) => {
    const type = req.params.type;
    switch (type) {
        case PROJECT:
            res.send(await projects.create(req.body));
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.put('/:type/id/:id', async (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    switch (type) {
        case PROJECT:
            res.send(await projects.update(req.body, id));
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.delete('/:type/id/:id', async (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    switch (type) {
        case PROJECT:
            res.send(await projects.deleteById(id));
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

export default routeListener;