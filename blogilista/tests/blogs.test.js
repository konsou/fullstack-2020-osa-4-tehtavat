const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = helper.manyBlogs

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

describe('adding a new note', () => {
    test('added note returned as json', async () => {
        await api
            .post('/api/blogs', helper.addTestBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    }),
    test('amount of blogs is increased by one', async () => {
        const initialBlogs = await helper.blogsInDb()
        await helper.addNewBlog()
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(initialBlogs.length + 1)
    }),
    test('added blog has correct content', async () => {
        await helper.addNewBlog()
        const blogsAfterAdding = await helper.blogsInDb()

        const titles = blogsAfterAdding.map(blog => blog.title)
        const authors = blogsAfterAdding.map(blog => blog.author)
        const urls = blogsAfterAdding.map(blog => blog.url)
        const likes = blogsAfterAdding.map(blog => blog.likes)

        expect(titles).toContain(helper.addTestBlog.title)
        expect(authors).toContain(helper.addTestBlog.author)
        expect(urls).toContain(helper.addTestBlog.url)
        expect(likes).toContain(helper.addTestBlog.likes)
    }),
    test('blog without likes defined is given 0 likes', async () => {
        const addedBlog = await helper.addNewBlog(helper.blogWithoutLikesDefined)
        expect(addedBlog.likes).toBe(0)
    }),
    test('adding blog without title or url should be rejected', async () => {
        const blogWithoutTitle = Object.assign({}, helper.addTestBlog)
        delete blogWithoutTitle.title

        await api
            .post('/api/blogs', blogWithoutTitle)
            .expect(400)



    })
})

afterAll(() => {
    mongoose.connection.close()
})
