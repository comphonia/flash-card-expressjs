const express = require('express')
const router = express.Router()
const {data} = require('../data/flashcardData.json')
const {cards} = data;

router.get('/',(req,res)=>{
    const cardNo = cards.length
    const id = Math.floor(Math.random() * Math.floor(cardNo));
    res.redirect(`/cards/${id}`)
})

router.get('/:id',(req,res)=>{
    const {side}=req.query
    const {id} = req.params
    if(!side)
      return res.redirect(`/cards/${id}?side=question`) 
    const name = req.cookies.username
    const text = cards[id][side]
    const {hint} = cards[id]
    const templateData = {id,text, name}


    if(side === 'question'){
        templateData.hint = hint
        templateData.sideToShow = 'answer'
        res.render('front',templateData)
    } else if (side === 'answer'){
        templateData.sideToShow = 'question'
        res.render('back',templateData)
    } else {return res.redirect(`/cards`) }

    
})

module.exports = router