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


    test('calculate likes of array og blogs ', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })

})