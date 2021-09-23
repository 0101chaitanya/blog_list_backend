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

        return current.likes <= acc ? acc : current.likes;


    }, 0)

    const target = blogs.find(item => item.likes === reduced);

    console.log(reduced)
    return ({

        title: target.title,
        author: target.author,
        likes: target.likes
    });


}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}