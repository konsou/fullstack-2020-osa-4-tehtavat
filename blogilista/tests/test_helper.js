const Blog = require('../models/blog')

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
const blogWithoutTitle = {
    author: 'Jeba Jee',
    url: 'http://jebajeejee.com?blogs=123',
    likes: 4
}
const blogWithoutUrl = {
    title: 'I Don\'t Believe In URLs',
    author: 'Pauli Isomäki',
    likes: 2
}

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

module.exports = {
    blogsInDb, 
    addNewBlog, 
    manyBlogs, 
    addTestBlog, 
    blogWithoutLikesDefined, 
    blogWithoutTitle,
    blogWithoutUrl,
}