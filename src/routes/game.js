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

export default routeListener;