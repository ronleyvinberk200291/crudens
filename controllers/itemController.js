const { Item } = require('../models')
let date_ob = new Date()
let current_year = date_ob.getFullYear()

module.exports = {
    create: function(req, res, next) {
        let items = {current_year, name: '', amount: ''}
        res.render('item/add', {items})
    },
    add: async function(req, res, next) {
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
    },
    // If usen't async and await, then error display is items.data.forEach is not a function
    all: async function(req, res, next) {
        const data = await Item.findAll()
        // res.json({items: data})
        let items = {data}
        res.render('item', {items, current_year})
    },
    one: async function(req, res, next) {
        const data = await Item.findOne({
            where: {id: req.params.id}
        })
        const data_json = data.toJSON()
        let items = {data_json, current_year}
        // console.log(data_json)
        res.render('item/view', {items})
    },
    edit: async function(req, res, next) {
        const data = await Item.findOne({
            where: {id: req.params.id}
        })
        const data_json = data.toJSON()
        let items = {data_json, current_year}
        // console.log(data_json)
        res.render('item/edit', {items})
    },
    update: async function(req, res, next) {
        let error = false
        let book_name = req.body.name
        let book_amount = req.body.amount
        if (book_name.length === 0 || book_amount.length === 0) {
            error = true
            req.flash('error', "Please enter Book Name and Amount");
        }
        if (!error) {
            try {
                await Item.update({name: req.body.name, amount: req.body.amount}, {where: {id: req.body.id}})
                req.flash('success', "Data successfully updated!");
                res.redirect('/items/view/'+item_id)
                // console.log(Item)
            } catch (error) {
                console.log(error)
            }
        }
    },
    delete: async function(req, res, next) {
        try {
            await Item.destroy({where: {id: req.body.id}})
            req.flash('success', "Data successfully deleted!");
            res.redirect('/items')
        } catch (error) {
            console.log(error)
        }
    }
}

// Promise style
// .then(result => res.json({message: 'Success!', data: result}))