import express from 'express'
import userController from '../../controller/user/index.js'
import { verificationMiddleware } from '../../middleware/auth/index.js';
const userRouter = express.Router()

//user router
userRouter.post('/registerUser', userController.registerUser );
userRouter.post('/login', userController.login );
userRouter.get('/comments',verificationMiddleware, userController.getReviews  );

export default userRouter