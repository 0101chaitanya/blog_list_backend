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
    let reduced = blogs.reduce((acc, current, i) => {

        return current.likes <= acc ? acc : i - 1;


    }, 0)

    console.log(reduced)
    return ({

        title: blogs[reduced].title,
        author: blogs[reduced].author,
        likes: blogs[reduced].likes
    });


}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}