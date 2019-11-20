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
    var response = {
        success: false,
        message: 'Categories not saved',
        category: null
    }

    Category.create(newCategory, (err, category) => {
        if(err){
            logger.error(response.message, err)
        } else {
            response.success = true
            response.message = 'Category saved'
            response.category = category
            logger.info(response.message, response.category)
        }
        res.status(200).send(response)
    })
})

// Get all categories
router.get('/all', (req, res) => {
    var response = {
        success: false,
        message: 'Categories not found',
        categories: null
    }
    Category.find({}, (err, categories) => {
        if(err){
            logger.error(response.message, err)
        } else {
            response.success = true
            response.message = 'Categories found'
            response.categories = categories
            logger.info(response.message)
        }
        res.status(200).send(response)
    })
})

// Get a category by id
router.get('', (req, res) => {
    var id = req.body.id
    var response = {
        success: false,
        message: 'Category not found',
        category: null
    }

    Category.findById(id, (err, category) => {
        if(err || category == null){
            response.message = `Category ${id} not found`
            logger.error(response.message, err)
        } else {
            response.success = true
            response.message = `Category ${id} found`
            response.category = category
            logger.info(response.message)
        }
        res.status(200).send(response)
    })
})

// Update a category 
router.put('', (req, res) => {
    var reqCategory = req.body
    var id = req.body._id
    var response = {
        success: false,
        message: 'Category not updated',
        category: null
    }

    Category.findByIdAndUpdate(id, reqCategory, {new: true}, (err, category) => { // {new: true} returns updated lift
        if(err){
            response.message = `Category ${id} not updated`
            logger.error(response.message, err)
        } else {
            response.success = true
            response.message = `Category ${id} updated`
            response.category = category
            logger.info(response.message, response.category)
        }
        res.status(200).send(response)
    })
})

// Delete a category
router.delete('', (req, res) => {
    var id = req.body.id
    var response = {
        success: false,
        message: 'Category not deleted'
    }

    Category.findByIdAndDelete(id, (err, category) => {
        if(err){
            response.message = `Category ${id} not deleted`
            logger.error(response.message, err)
        } else {
            response.success = true
            response.message = `Category ${id} deleted`
            logger.info(response.message)
        }
        res.status(200).send(response)
    })
})

module.exports = router