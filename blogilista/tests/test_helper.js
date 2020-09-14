const Blog = require('../models/blog')

const manyBlogs = require('./list_with_many_blogs.json')
const addTestBlog = {
    'title': 'Mualiman kolomaniks paras bolgi',
    'author': 'Pena Kaalipelto',
    'url': 'http://mualiman-kolomaniks-paras-bolgi.com',
    'likes': 50,
}

const blogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

const addNewBlog = async () => {
    const newBlog = Blog(addTestBlog)

    const response = await newBlog.save()
    return response
}

module.exports = {
    blogsInDb, addNewBlog, manyBlogs, addTestBlog
}