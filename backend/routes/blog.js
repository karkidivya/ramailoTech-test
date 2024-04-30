import express from 'express'
import blogController from '../controller/blogController.js'
 import { verificationMiddleware } from '../auth/index.js';
const blogRouter = express.Router()

//user router
blogRouter.post('/addblog', blogController.addBlog );
blogRouter.post('/updateBlog', blogController.updateBlog );
blogRouter.get('/getBlogs', blogController.getAllBlogs );
blogRouter.get('/getBlogsByCategory', blogController.getAllBlogsByCategory );
blogRouter.delete('/delete', blogController.deleteBlog );
blogRouter.get('/blogcomments',verificationMiddleware, blogController.getCommentsByBlogId  );
blogRouter.get('/addcomments',verificationMiddleware, blogController.addComments  );

export default blogRouter