const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, currentBlog) => {
        return sum + currentBlog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.length
        ? blogs.reduce((prev, curr) => {
            return (prev.likes > curr.likes) ? prev : curr
        })
        : null
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    
    const authors = lodash.countBy(blogs, 'author')
    const authorWithMostBlogs = lodash.max(Object.keys(authors), o => authors[o])

    return {
        author: authorWithMostBlogs,
        blogs: authors[authorWithMostBlogs]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
}