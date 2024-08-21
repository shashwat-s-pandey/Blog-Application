import blog from "../models/blog.js";
import User from "../models/User.js";

export const createBlog = async(req, res) => {
    const {title, description, author, selectedFile, tags} = req.body;
    try{
        const existing_user = await User.findById(author)
        // to check if author exists
        if(!existing_user){
            return res.status(404).json({mssg: "User does not exist"})
        }
        // if user exists
        const Blog = new blog({
            title,
            description,
            author,
            selectedFile,
            tags
        })

        await Blog.save()

        return res.status(201).json({mssg: "Blog created successfully!"}) 

    }
    catch(error){
        res.status(500).json({mssg: "Something went wrong"})
    }
}

export const getAllBlogs = async(req, res) => {
    try {
        const allBlogs = await blog.find({})

        return res.status(200).json(allBlogs)
    }
    catch(error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json({mssg: "Something went wrong", error: error.message})
    }
}

export const getBlogById = async(req, res) => {
    const {id} = req.params

    try {
        const myBlog = await blog.findById(id)

        if(!myBlog){
            return res.status(404).json({msg: "Blog not found"});
        }

        return res.status(200).json({myBlog})
    }
    catch(error) {
        return res.status(500).json({mssg: "Something went wrong"})
    }
}

export const getBlogBySearch = async(req, res) => {
    const {searchQuery, tags} = req.query 

    try {
        const title = new RegExp(searchQuery, 'i')

        let blogs;

        if(tags) {
            blogs = await blog.find({$or: [{title}, {tags: {$in: tags.split(',')}}]})
        }
        else {
            blogs = await blog.find({title})
        }

        return res.status(200).json({blogs})
    }
    catch {
        return res.status(404).json({mssg: "something went wrong"})
    }
}

export const updateBlog = async(req, res) => {
    const {id} = req.params
    const {title, description, selectedFile, tags} = req.body

    try {
        const updatedBlog = await blog.findByIdAndUpdate(id, {title, description, selectedFile, tags}, {new: true})
        return res.status(200).json({updatedBlog})
    }
    catch(error) {
        return res.status(500).json({mssg: "Something went wrong"})
    }
}

export const deleteBlog = async(req, res) => {
    const { id } = req.params

    try {
        await blog.findByIdAndDelete(id)
        return res.status(200).json({mssg: "Deleted successfully"})
    }
    catch(error) {
        return res.status(500).json({mssg: "Something went wrong"})
    }
}