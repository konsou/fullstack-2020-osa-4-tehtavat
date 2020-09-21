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
    try {
        const result = await Blog.deleteOne({ '_id': request.params.id })
        result.deletedCount
            ? response.status(204).end()
            : response.status(404).end()
    } catch (error) {
        response.status(400).json({error: 'malformed id'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    console.log(request.body)
    try {
        const result = await Blog.replaceOne(
            { '_id': request.params.id },
            request.body
        )

        console.log(result)

        result.nModified
            ? response.status(204).end()
            : response.status(404).end()

    } catch (error) {
        response.status(400).json({ error: 'malformed request' })
    }
})

module.exports = blogsRouter