import express from 'express';
import { Game } from '../controllers/index';

const routeListener = express.Router();
const game = new Game();

routeListener.post('/add', async (req, res, next) => {
    try {
        res.send(await game.addStoryToGame(req.body));
    } catch (error) {
        next(error);
    }
});

routeListener.post('/start', async (req, res, next) => {
    try {
        res.send(await game.start(req.body));
    } catch (error) {
        next(error);
    }
});

routeListener.get('/deals', async (req, res, next) => {
    try {
        res.send(await game.deals());
    } catch (error) {
        next(error);
    }
});

routeListener.patch('/showdown/hand/:handid', async (req, res, next) => {
    let handid = req.params.handid;
    try {
        res.send(await game.showdown(handid, req.body));
    } catch (error) {
        next(error);
    }
});

export default routeListener;