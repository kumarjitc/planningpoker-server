import express from 'express';
import { PROJECT } from '../utils/constants';
import Projects from '../controllers/projects'

const routeListener = express.Router();

routeListener.use((req, res, next) => {
    console.log('Request Received At - Setup - ', Date.now());
    next();
});

routeListener.get('/:type/', (req, res) => {
    const type = req.params.type;

    switch (type) {
        case PROJECT:
            res.send(Projects.getAll());
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.get('/:type/id/:id', (req, res) => {
    switch (type) {
        case PROJECT:
            res.send(Projects.getAll());
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.post('/:type/', (req, res) => {
    switch (type) {
        case PROJECT:
            res.send(Projects.getAll());
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.put('/:type/id/:id', (req, res) => {
    switch (type) {
        case PROJECT:
            res.send(Projects.getAll());
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

routeListener.delete('/:type/id/:id', (req, res) => {
    switch (type) {
        case PROJECT:
            res.send(Projects.getAll());
            break;
        default:
            res.send('Type Not Supported Yet');
    }
});

export default routeListener;