import { Router } from 'express';
import userRouter from './user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.use('/users', userRouter);