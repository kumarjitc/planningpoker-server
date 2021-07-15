import Express from 'express';
import cors from 'cors';

import { Projects, Sprints } from './routes/index';
import { errorHandler } from './routes/error';

const app = Express();

app.use(Express.json());
app.use(Express.raw());

app.use(cors());

app.use('/setup/project', Projects);
app.use('/setup/sprint', Sprints);

app.use((error, _req, res, _next) => {
    console.log(error);
    errorHandler(error, res);
});

app.listen(8000, (test) => {
    console.log('Plan On At 8000');
});
