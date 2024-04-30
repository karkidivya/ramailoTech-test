import Blog from '../../models/blog'; 
const blogController = {
    addBlog: async (req, res) => {
        try {
            const { title, content, author, category, tags } = req.body;
            const newBlog = new Blog({ title, content, author, category, tags });
            await newBlog.save();
            res.status(201).json(newBlog);
        } catch (error) {
            console.error('Error adding blog:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content, author, category, tags } = req.body;
            const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author, category, tags }, { new: true });
            res.json(updatedBlog);
        } catch (error) {
            console.error('Error updating blog:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getAllBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.json(blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getAllBlogsByCategory: async (req, res) => {
        try {
            const { category } = req.query;
            const blogs = await Blog.find({ category });
            res.json(blogs);
        } catch (error) {
            console.error('Error fetching category blogs:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;
            await Blog.findByIdAndDelete(id);
            res.json({ message: 'Blog deleted successfully' });
        } catch (error) {
            console.error('Error deleting blog:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getCommentsByBlogId: async (req, res) => {
        try {
            const { blogId } = req.query;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json(blog.comment);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    addComments: async (req, res) => {
        try {
            const { blogId, userName, comment } = req.body;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            blog.comment.push({ userName, comment });
            await blog.save();
            res.status(201).json({ message: 'Comment added successfully' });
        } catch (error) {
            console.error('Error adding comments:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

export default blogController;
