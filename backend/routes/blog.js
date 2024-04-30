import express from 'express'
import blogController from '../../controller/user/index.js'
import { verificationMiddleware } from '../../middleware/auth/index.js';
const blogRouter = express.Router()

//user router
blogRouter.post('/addblog', blogController.addBlog );
blogRouter.post('/updateBlog', blogController.UpdateBlog );
blogRouter.get('/getBlogs', blogController.getAllBlogs );
blogRouter.get('/getBlogsByCategory', blogController.getAllBlogsByCategory );
blogRouter.delete('/delete', blogController.deleteBlog );
blogRouter.get('/blogcomments',verificationMiddleware, blogController.getCommentsByBlogId  );
blogRouter.get('/addcomments',verificationMiddleware, blogController.addComments  );

export default userRouter