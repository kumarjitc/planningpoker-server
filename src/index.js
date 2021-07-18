import Express from 'express';
import cors from 'cors';

import { Board, Projects, Sprints, Stories } from './routes';
import { errorHandler } from './routes/error';

const app = Express();

app.use(Express.json());
app.use(Express.raw());

app.use(cors());

app.use('/setup/project', Projects);
app.use('/setup/sprint', Sprints);
app.use('/setup/story', Stories);
app.use('/setup/board', Board);

app.use((error, _req, res, _next) => {
    errorHandler(error, res);
});

app.listen(8000, () => {
    console.log('Plan On At 8000');
});
