const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

// Create a lift
router.post('', (req, res) => {
    var body = req.body
    var fields = ['category_id', 'name', 'description']
    var values = [body.category_id, body.name, body.description]
    dbUtils.insert(res, 'lift', fields, values, ['*'], 'Lift saved', 'Lift not saved')
})

// Get all lifts
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, 'lift', ['*'], 'Lifts found', 'Lifts not found')
})

// Get a lift by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectByID(res, 'lift', ['*'], id, 'Lift found', `Lift ${id} not found`)
})

// Update a lift by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['category_id', 'name', 'description']
    var setValues = [body.category_id, body.name, body.description]
    var id = body.id
    dbUtils.updateOneByID(res, 'lift', setFields, setValues, id, ['*'], 'Lift updated', `Lift ${id} not updated`)
})

// Delete a lift by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, 'lift', req.body.id, `Lift ${id} deleted`, `Lift ${id} not deleted`)
})

module.exports = router