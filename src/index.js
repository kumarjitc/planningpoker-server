import Express from 'express';

import { Setup } from './routes/index';

const app = Express();

app.use('/setup', Setup);

app.listen(8000, (test) => {
    console.log('Plan On At 8000');
});
