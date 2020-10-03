const Blog = require('../models/blog')
const User = require('../models/user')


const manyBlogs = require('./list_with_many_blogs.json')
const addTestBlog = {
    'title': 'Mualiman kolomaniks paras bolgi',
    'author': 'Pena Kaalipelto',
    'url': 'http://mualiman-kolomaniks-paras-bolgi.com',
    'likes': 50,
}
const blogWithoutLikesDefined = {
    'title': 'Can a blog survive without likes?',
    'author': 'John Cedars',
    'url': 'http://google.com/blogs/nolikes',
}

const initialUsers = [
    {
        username: 'root',
        name: 'The Owner Of Everything',
        password: 'rootpass',
    },
    {
        username: 'konso',
        name: 'Tomi Javanainen',
        password: '1234',
    }
]


const blogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

const addNewBlog = async (blog) => {
    let newBlog
    if (blog){
        newBlog = Blog(blog)
    } else {
        newBlog = Blog(addTestBlog)
    }

    const response = await newBlog.save()
    return response
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(note => note.toJSON())
}

module.exports = {
    blogsInDb, 
    addNewBlog, 
    manyBlogs, 
    addTestBlog, 
    blogWithoutLikesDefined,
    initialUsers,
    usersInDb,
}