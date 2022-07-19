const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs');
const { render } = require('ejs');


//express app
const app = express();

//connect to mongoDB


const dbURI = "mongodb+srv://ecs93:soccerpro47@cluster0.13sexrq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI).then(() => {
    app.listen(3000)
    //don't want to listen to req until db is connected and data is retreived
    console.log('connected to db')
}).catch((err) => {
    console.log(err)
})

//register view engine
app.set('view engine', 'ejs')
//this automatically checks the views folder for data to display
//if u want to use different name for views folder
// app.set('view', 'name_of_folder')

// app.listen(3000)

app.use(express.static('public'))

app.use(express.urlencoded({extended : true}))
//middleware logger
app.use(morgan('dev'))

app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    // res.sendFile('./views/index.html', { root: __dirname})

    // const blogs = [
    //     { title: 'carhartt pants are fire', snippet: "can soemone on grailed sell me for 20 pls" },
    //     { title: 'carhartt pants are fire', snippet: "can soemone on grailed sell me for 20 pls" },         
    //     { title: 'carhartt pants are fire', snippet: "can soemone on grailed sell me for 20 pls"},
    //     { title: 'carhartt pants are fire', snippet: "can soemone on grailed sell me for 20 pls"}
    // ]

    // res.render('index', {
    //     title: 'Home', blogs
    // })

    res.redirect('/blogs')

})

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname})
    // res.send('<p>about page</p>')
    res.render('about', {
        title: 'About'
    })
})

// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'Create'
    })
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => { 
            res.render('index', {
                title: 'All Blogs', 
                blogs: result 
            })
        }).catch((err) => {
            console.log(err)
        })
})


app.post('/blogs', (req, res) => {
    console.log('here')
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.redirect('/blogs')
    }).catch((err) => {
        console.log(err)
    })
})







// app.get('/blogs/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'blog title2',
//         snippet: "eric's blog2",
//         body: "more about eric's blog2"
//     })
//     blog.save()
//         .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/blogs/all-blogs', (req, res) => {
//     Blog.find().then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/blogs/single-blog', (req, res) => {
//     Blog.findById("62d3120c403321e0ec0b0fc6")
//         .then((result) => {
//             res.send(result)
//         }).catch((err) => {
//             console.log(err)
//         })
// })

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        }).catch(err => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id).then((result) => {
        res.render('details', {blog: result, title: 'Blog Details'})
    }).catch( err => {
        console.log(err)
    })
})

app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname})
    res.status(404).render('404', 
    {
        title: 'Error'
    })
})


