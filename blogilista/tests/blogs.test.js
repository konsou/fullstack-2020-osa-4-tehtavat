const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = require('./list_with_many_blogs.json')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('fetching notes', () => {
    test('notes returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }),
    test('number of notes in db matches with initial notes', async () => {
        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb).toHaveLength(initialBlogs.length)
    }),
    test('id field is defined', async () => {
        const blogsInDb = await helper.blogsInDb()

        for (const blog of blogsInDb) {
            expect(blog.id).toBeDefined()
        }
    })
    /*
    test('fetched note contents match initial note contents', async () => {
        // todo
    })
    */
})

afterAll(() => {
    mongoose.connection.close()
})
