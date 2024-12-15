import { app } from '../app';
import { swapRouter } from './swap';

app.use('/api', swapRouter);
