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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
}