import express from "express";
import mainRouter from './mains.mjs';
import prodRouter from './products.mjs';
import userRouter from './user.mjs';
import authRout from './auth.mjs';

const router = express.Router()

router.use('/', mainRouter);
router.use('/auth', authRout)
router.use('/products', prodRouter);
router.use('/user', userRouter);

export default router;
