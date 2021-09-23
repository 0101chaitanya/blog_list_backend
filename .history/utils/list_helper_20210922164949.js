const dummy = (blogs) => {

    return 1;
}

const totalLikes = (blogs) => {


    if (blogs.length === 0) {

        return 0
    }
    return blogs.reduce((acc, current) => {

        return acc + current.likes
    }, 0)

}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {

        return {

        }
    }
    let reduced = blogs.reduce((acc, current) => {

        return current.likes > acc ? current.likes : acc
    }, 0)

    return blogs[reduced]


}

module.exports = {
    dummy,
    totalLikes
}