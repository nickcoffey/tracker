const express = require('express')
const router = express.Router()
const index = require('../index')
const dbUtils = require('../util/dbUtils')
const logger = index.logger

// Create a category
router.post('', (req, res) => {
    var fields = ['name', 'description']
    var values = [req.body.name, req.body.description]
    dbUtils.insert(res, 'category', fields, values, 'Category saved', 'Category not saved')
})

// Get all categories
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, 'category', ['*'], 'Categories found', 'Categories not found')
})

// Get a category by id
router.get('', (req, res) => {
    dbUtils.selectByID(res, 'category', ['id'], [req.body.id], 'Category found', 'Category not found')
})

// Update a category by id
router.put('', (req, res) => {
    var setFields = ['name', 'description']
    var setValues = [req.body.name, req.body.description]
    dbUtils.updateOneByID(res, 'category', setFields, setValues, req.body.id, 'Category updated', 'Category not updated')
})

// Delete a category by id
router.delete('', (req, res) => {
    dbUtils.deleteOneByID(res, 'category', req.body.id, 'Category deleted', 'Category not deleted')
})

module.exports = router