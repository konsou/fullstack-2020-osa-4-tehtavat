const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const config = require('../utils/config')

const app = require('../app')

const User = require('../models/user')

const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

    const userPromiseArray = helper.initialUsers.map(async user => {
        return new User({
            username: user.username,
            name: user.name,
            passwordHash: await bcrypt.hash(user.password, config.PASSWORD_SALT_ROUNDS)
        })
    })

    const usersWithHashedPasswords = await Promise.all(userPromiseArray)

    await User.insertMany(usersWithHashedPasswords)
})

describe('fetching users', () => {
    test('users returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('number of users in db matches with initial users', async () => {
        const usersInDb = await helper.usersInDb()
        expect(usersInDb).toHaveLength(helper.initialUsers.length)
    })
    test('id field is defined, password field is NOT defined', async () => {
        const usersInDb = await helper.usersInDb()

        for (const user of usersInDb) {
            expect(user.id).toBeDefined()
            expect(user.password).not.toBeDefined()
            expect(user.passwordHash).not.toBeDefined()
        }
    })
})

describe('adding a new user', () => {
    test('added user returned as json and correct contents', async () => {
        const response = await api
            .post('/api/users')
            .send(helper.addTestUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.username).toEqual(helper.addTestUser.username)
        expect(response.body.name).toEqual(helper.addTestUser.name)
        expect(response.body.id).toBeDefined()
    })
    /*
    test('amount of blogs is increased by one', async () => {
        const initialBlogs = await helper.blogsInDb()
        await helper.addNewBlog()
        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(initialBlogs.length + 1)
    })
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
        const blogWithoutTitle = { ...helper.addTestBlog }
        delete blogWithoutTitle.title

        const blogWithoutUrl = { ...helper.addTestBlog }
        delete blogWithoutUrl.url

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400)
    })
    */
})

/*
describe('deleting a blog', () => {
    test('deleting a valid blog succeeds and returns status code 204', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()

        expect(blogsAfterDelete.length).toBe(blogsAtStart.length - 1)

        const titles = blogsAfterDelete.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
    test('deleting a nonexisting blog should return 404', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToDelete = blogsAtStart[0]
        await Blog.deleteOne({ '_id': blogToDelete.id })

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(404)
    })
    test('malformed id should return 400', async () => {
        const invalidId = 'eivgy8gy'
        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('updating a blog', () => {
    test('updating a blog succeeds with code 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const modifiedBlog = { 
            id: blogsAtStart[0].id,
            title: 'This title has been modified',
            author: 'This author has been modified',
            url: 'http://This_url_has_been_modified.co.uk',
            likes: 2834719234876,
        }

        await api
            .put(`/api/blogs/${modifiedBlog.id}`)
            .send(modifiedBlog)
            .expect(204)

        const updatedBlogFromDb = await Blog.findById(modifiedBlog.id)

        expect(updatedBlogFromDb.title).toEqual(modifiedBlog.title)
        expect(updatedBlogFromDb.author).toEqual(modifiedBlog.author)
        expect(updatedBlogFromDb.url).toEqual(modifiedBlog.url)
        expect(updatedBlogFromDb.likes).toEqual(modifiedBlog.likes)
    })
})
*/
afterAll(() => {
    mongoose.connection.close()
})
