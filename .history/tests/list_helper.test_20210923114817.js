const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');
const listWithOneBlog = require('./arr1');
const blogs = require('./arr2');
const Blog = require("../models/blog");
const app = require("../app");
const supertest = require("supertest");
const Mongoose = require('mongoose');
const api = supertest(app);
const { info, logger } = require("../utils/logger");

beforeEach(async() => {
    await Blog.deleteMany({})

    const BlogObjects = blogs
        .map(blog => new BLog(blog))
    const promiseArray = BlogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test("blogs are returned as json", async() => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/)
}, 10000)

test("blogs are returned as json", async() => {
    const response = await api.get("/api/blogs");


    expect(response.body.id).toBeDefined()



    afterAll(() => {
        Mongoose.connection.close();
    })
})




/* describe("dummy tests", () => {

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
 */