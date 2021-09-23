const dummy = (blogs) => {

    return 1;
}

const totalLikes = (blogs) => {

    return blogs.reduce((acc, current) => {

        return acc + current.likes
    })

}

module.exports = {
    dummy,
    totalLikes
}