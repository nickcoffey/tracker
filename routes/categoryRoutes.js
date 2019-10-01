const express = require('express')
const router = express.Router()
const index = require('../index')
const logger = index.logger
const Category = require('../models/category')

// Create a category
router.post('', (req, res) => {
    var newCategory = {
        name: req.body.name,
        description: req.body.description
    }

    Category.create(newCategory, (err, category) => {
        if(err){
            res.status(200).send('Category not saved')
            logger.error('Category not saved', err)
        } else {
            res.status(200).send(category)
            logger.info('Category saved', category)
        }
    })
})

// Get all categories
router.get('/all', (req, res) => {
    Category.find({}, (err, categories) => {
        if(err){
            res.status(200).send('Categories not found')
            logger.error('Categories not found', err)
        } else {
            res.status(200).send(categories)
            logger.info('Categories found')
        }
    })
})

// Get a category by id
router.get('', (req, res) => {
    var id = req.body.id

    Category.findById(id, (err, category) => {
        if(err){
            res.status(200).send('Category not found')
            logger.error(`Category ${id} not found`, err)
        } else {
            res.status(200).send(category)
            logger.info(`Category ${id} found`)
        }
    })
})

// Update a category 
router.put('', (req, res) => {
    var reqCategory = req.body
    var id = req.body._id

    Category.findByIdAndUpdate(id, reqCategory, {new: true}, (err, category) => { // {new: true} returns updated lift
        if(err){
            res.status(200).send('Category not updated')
            logger.error('Category not updated', err)
        } else {
            res.status(200).send(category)
            logger.info('Category updated', category)
        }
    })
})

// Delete a category
router.delete('', (req, res) => {
    var id = req.body.id

    Category.findByIdAndDelete(id, (err, category) => {
        if(err){
            res.status(200).send(`Category ${id} not deleted`)
            logger.error(`Category ${id} not deleted`, err)
        } else {
            res.status(200).send(category)
            logger.info(`Category ${id} deleted`)
        }
    })
})

module.exports = router