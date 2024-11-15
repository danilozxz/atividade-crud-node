import { Router } from 'express';
import userRouter from './user';
import postRouter from './post';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.use('/users', userRouter);
mainRouter.use('/posts', postRouter)