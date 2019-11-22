const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

// Create a category
router.post('', (req, res) => {
    var body = req.body
    var fields = ['name', 'description']
    var values = [body.name, body.description]
    dbUtils.insert(res, 'category', fields, values, ['*'], 'Category saved', 'Category not saved')
})

// Get all categories
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, 'category', ['*'], 'Categories found', 'Categories not found')
})

// Get a category by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectByID(res, 'category', ['*'], id, 'Category found', `Category ${id} not found`)
})

// Update a category by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['name', 'description']
    var setValues = [body.name, body.description]
    var id = body.id
    dbUtils.updateOneByID(res, 'category', setFields, setValues, id, ['*'], 'Category updated', `Category ${id} not updated`)
})

// Delete a category by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, 'category', req.body.id, `Category ${id} deleted`, `Category ${id} not deleted`)
})

module.exports = router