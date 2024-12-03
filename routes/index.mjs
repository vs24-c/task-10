import express from "express";
import mainRouter from './mains.mjs';
import prodRouter from './products.mjs';
import userRouter from './user.mjs';

const router = express.Router()

router.use('/', mainRouter);
router.use('/products', prodRouter);
router.use('/user', userRouter);

export default router;
