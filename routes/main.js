const express = require('express')
const router = express.Router()

//create route
router.get('/',(req,res)=>{
    const name = req.cookies.username
    if(name)
        res.render('index',{name})
    else
        res.redirect('/hello')
})

router.post('/goodbye',(req,res)=>{
    res.clearCookie('username')
    res.redirect('/')
})


router.get('/hello',(req,res)=>{
    const name = req.cookies.username
    if(name)
        res.redirect('/')
    else
        res.render('hello')
})
//post request to handle submission
router.post('/hello',(req,res)=>{
    //set cookie
    res.cookie('username', req.body.username)
    res.redirect('/')
})

module.exports = router