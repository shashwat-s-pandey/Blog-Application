import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controller/blog.js';

const Router = express.Router()

Router.post('/', createBlog)
Router.get('/', getAllBlogs)
Router.get('/:', getBlogById)
Router.post('/:', updateBlog)
Router.delete('/:', deleteBlog)

export default Router