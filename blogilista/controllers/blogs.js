const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try {
        const returnedBlog = await blog.save()
        response.status(201).json(returnedBlog)
    } catch (error) {
        console.log(request.body)
        console.log(blog)
        console.log(error)
        response.status(400).json(error)
    }
})

module.exports = blogsRouter