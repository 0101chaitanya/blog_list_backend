const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');
const listWithOneBlog = require('./arr1');
const blogs = require('./arr2');
const app = require("../app");
const supertest = require("supertest");
const { Mongoose } = require('mongoose');
const api = supertest(app);

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
        const result = favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,

        })
    })


    test('calculate likes of array of blogs ', () => {
        const result = favoriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,

        })
    })

})

test("blogs are returned as json", async() => {
    await api.get("/api/notes").expect(200).expect("Content-Type", /application\/json/)
})


afterAll(() => {
    Mongoose.connection.close();
})