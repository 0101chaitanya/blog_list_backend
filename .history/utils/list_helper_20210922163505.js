const dummy = (blogs) => {

    return 1;
}

const likes = (blogs) => {

    blogs.reduce((acc, current) => {

        return acc + current.likes
    })

}

module.exports = dummy;