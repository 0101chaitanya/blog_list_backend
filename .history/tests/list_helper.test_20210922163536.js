const { dummy, likes } = require('../utils/list_helper');

describe("dummy tests", () => {

    test('dummy returns one', () => {
        const blogs = []

        const result = dummy(blogs)
        expect(result).toBe(1)
    })
})