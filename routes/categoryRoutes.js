const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

var table = 'category'

// Create a category
router.post('', (req, res) => {
    var body = req.body
    var fields = ['name', 'description']
    var values = [body.name, body.description]
    dbUtils.insert(res, table, fields, values, ['*'], 'Category saved', 'Category not saved')
})

// Get all categories
router.get('/all', (req, res) => {
    dbUtils.selectAllWhere(res, table, ['*'], [], [], 'Categories found', 'Categories not found')
})

// Get a category by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectWhere(res, table, ['*'], ['id'], [id], 'Category found', `Category ${id} not found`)
})

// Update a category by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['name', 'description']
    var setValues = [body.name, body.description]
    var id = body.id
    dbUtils.updateOneByID(res, table, setFields, setValues, id, ['*'], 'Category updated', `Category ${id} not updated`)
})

// Delete a category by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, table, req.body.id, `Category ${id} deleted`, `Category ${id} not deleted`)
})

module.exports = router
