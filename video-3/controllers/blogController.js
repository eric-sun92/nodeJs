const Blog = require('../models/blogs');

const getBlog = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => { 
            res.render('index', {
                title: 'All Blogs', 
                blogs: result 
            })
        }).catch((err) => {
            console.log(err)
        })
}

const createBlog = (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.redirect('/blogs')
    }).catch((err) => {
        console.log(err)
    })
}

const createBlogGet = (req, res) => {
    res.render('create', {
        title: 'Create'
    })
}

const deleteBlog = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        }).catch(err => {
            console.log(err)
        })
}

const blogDetails = (req, res) => {
    const id = req.params.id
    Blog.findById(id).then((result) => {
        res.render('details', {blog: result, title: 'Blog Details'})
    }).catch( err => {
        res.status(404).render('404', {title: "PAGE NOT FOUND"})
    })
}

module.exports = {
    getBlog,
    createBlog,
    createBlogGet,
    deleteBlog,
    blogDetails
}