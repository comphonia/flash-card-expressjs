
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//create an express app
const app = express()

const mainRoutes = require('./routes/main')
const cardRoutes = require('./routes/cards')
var port = process.env.PORT || 3000

// turn off parsers extended options
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/static',express.static('public'))
app.use(mainRoutes)
app.use('/cards', cardRoutes)

// middleware for testing error handling with next()
// app.use((req,res,next)=>{
//     console.log('Shown')
//     const err = new Error("I am Err")
//     next(err)
// })
//const colors =['red','orange','yellow','green']

//define settings in express
app.set('view engine', 'pug')

//middleware to handle 404 pages
app.use((req,res,next)=>{
    const err = new Error('Not Found')
    err.status=404
    next(err)
})

//error handler
app.use((err,req,res,next)=>{
    res.locals.error=err;
    res.status(500)
    res.render('error')
})
//setup a dev server
app.listen(port,()=>console.log("Server is running on port 3000 "))