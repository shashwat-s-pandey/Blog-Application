import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getBlogBySearch, updateBlog } from '../controller/blog.js';

const Router = express.Router()

Router.post('/', createBlog)
Router.get('/', getAllBlogs)
Router.get('/search', getBlogBySearch)
Router.get('/:id', getBlogById)
Router.post('/:id', updateBlog)
Router.delete('/:id', deleteBlog)

export default Router