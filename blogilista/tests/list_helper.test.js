const listHelper = require('../utils/list_helper')
const listWithManyBlogs = require('./list_with_many_blogs.json')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
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