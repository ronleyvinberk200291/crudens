var express = require('express')
var router = express.Router()
const { Item } = require('../models')
let date_ob = new Date()
let current_year = date_ob.getFullYear()

//  CREATE
router.get('/add', function(req, res, next){
    let items = {current_year, name: '', amount: ''}
    res.render('item/add', {items})
})

router.post('/add', async function(req, res, next){  
    let error = false
    let book_name = req.body.name
    let book_amount = req.body.amount
    if (book_name.length === 0 || book_amount.length === 0) {
        error = true
        req.flash('error', "Please enter Book Name and Amount");
        res.render('item/add')
    }
    if (!error) {
        try {
            const data = await Item.create({ name: req.body.name, amount: req.body.amount })
            req.flash('success', "Data successfully saved!");
            res.redirect('/items/view/'+data.id)
            // console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }
})

// READ
router.get('/', async function(req, res, next){
    const data = await Item.findAll()
    // res.json({items: data})
    let items = {data, current_year}
    res.render('item', {items})
})

router.get('/view/(:id)', async function(req, res, next){
    const item_id = req.params.id
    try {
        const data = await Item.findAll({
            where: {id: item_id}
        })
        let items = {data, current_year}
        res.render('item/view', {items})
    } catch (error) {
        console.log(error)
    }
})

// UPDATE
router.get('/edit/(:id)', async function(req, res, next){
    const item_id = req.params.id
    try {
        const data = await Item.findAll({where: {id: item_id}})
        let items = {data, current_year}
        res.render('item/edit', {items})
    } catch (error) {
        console.log(error)
    }
})

router.post('/update', async function(req, res, next){
    let error = false
    let item_id = req.body.id
    let book_name = req.body.name
    let book_amount = req.body.amount
    if (book_name.length === 0 || book_amount.length === 0) {
        error = true
        req.flash('error', "Please enter Book Name and Amount");
    }
    if (!error) {
        try {
            await Item.update({ name: req.body.name, amount: req.body.amount }, { where: { id: item_id } })
            req.flash('success', "Data successfully updated!");
            res.redirect('/items/view/'+item_id)
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
})

// DELETE
router.post('/delete', async function(req, res, next){
    let item_id = req.body.id
    try {
        await Item.destroy({where: {id: item_id}})
        req.flash('success', "Data successfully deleted!");
        res.redirect('/items')
    } catch (error) {
        console.log(error)
    }
})

// Promise style
// .then(result => res.json({message: 'Success!', data: result}))
module.exports = router
