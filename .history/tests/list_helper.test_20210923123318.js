const {
    dummy,
    totalLikes,
    favoriteBlog,
    nonExistingId,
    blogsInDb
} = require('../utils/list_helper');
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
        .map(blog => new Blog(blog))
    const promiseArray = BlogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test("blogs are returned as json", async() => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/)
}, 10000)

test("blogs are returned as json", async() => {
    const response = await api.get("/api/blogs");

    //console.log(response.toJSON());
    expect(response.body[0].id).toBeDefined()




})


test('a valid blog can be added ', async() => {
    const newBlog = {
        title: "flintstones yabadabadobado",
        author: "allen poe",
        url: "http://www.u.india.edu/~rubinson/non_copyright_violations/Go_To_Considered_hell.html",
        likes: 50,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length + 1)

    const contents = blogsAtEnd.map(b => b.author)
    expect(contents).toContain(
        "allen poe"
    )
})

test('undefined likes default to 0', async() => {
    const newBlog = {
        title: "game of thromes",
        author: "lilly mcnamara",
        url: "http://www.u.india.edu/~rubinson/non_copyright_violations/Go_To_Considered_hell.html",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1]).toMatchObject({
        title: "game of thromes",
        author: "lilly mcnamara",
        url: "http://www.u.india.edu/~rubinson/non_copyright_violations/Go_To_Considered_hell.html",
        likes: 0
    })


})
test('undefined likes default to 0', async() => {
    const newBlog = {
        author: "lilly mcnamara",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})



afterAll(() => {
    Mongoose.connection.close();
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