const { dummy, totalLikes } = require('../utils/list_helper');
const listWithOneBlog = require('./arr1');
const blogs = require('./arr2');


describe("dummy tests", () => {

    test('dummy returns one', () => {
        const blogs = []

        const result = dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [];

    test('when list has 0 items', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(0)
    })
})

describe('total likes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })


    test('calculate likes of array of blogs ', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })

})

describe('max likes', () => {

    test('total likes when one item passed', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,

        })
    })


    test('calculate likes of array of blogs ', () => {
        const result = totalLikes(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,

        })
    })

})