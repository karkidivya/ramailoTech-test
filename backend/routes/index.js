import express from 'express'
import userRouter from './user.js'
import blogRouter from './blog.js'

const router = express.Router()

router.use('/user', userRouter );
router.use('/blog', blogRouter );

router.route('/*').all( (req, res ) => res.status(400).send() )

export default router  