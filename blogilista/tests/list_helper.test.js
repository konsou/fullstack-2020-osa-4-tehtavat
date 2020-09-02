const listHelper = require('../utils/list_helper')
const listWithManyBlogs = require('./list_with_many_blogs.json')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const highestLikesBlog = {
    '_id': '5a422b3a1b54a676234d17f9',
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 12,
    '__v': 0
}


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of list of one blog should be the likes of that one blog', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
    })

    test('of many blogs calculated correctly', () => {
        expect(listHelper.totalLikes(listWithManyBlogs)).toBe(36)
    })
})

describe('favourite blog', () => {
    test('of empty list is null', () => {
        expect(listHelper.favouriteBlog([])).toBe(null)
    })
    test('of one blog is that blog', () => {
        expect(listHelper.favouriteBlog(listWithOneBlog)).toBe(listWithOneBlog[0])
    })
    test('of many blogs is chosen correctly', () => {
        expect(listHelper.favouriteBlog(listWithManyBlogs)).toEqual(highestLikesBlog)
    })
})

describe('author of most blogs', () => {
    test('of empty list is null', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })
    test('of list of one blog is the author of that blog', () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({ author: listWithOneBlog[0].author, blogs: 1 })
    })
    test('chosen correctly from many blogs', () => {
        expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
})