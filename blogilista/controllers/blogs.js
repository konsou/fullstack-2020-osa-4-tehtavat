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
    } catch(error) {
        response.status(400).json(error)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    console.log(request.params)
    try {
        const result = await Blog.deleteOne({ '_id': request.params.id })
        result.deletedCount
            ? response.status(204).end()
            : response.status(404).end()
    } catch (error) {
        response.status(400).json({error: 'malformed id'})
    }
})

module.exports = blogsRouter