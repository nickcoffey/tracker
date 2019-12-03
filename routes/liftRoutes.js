const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

var table = 'lift'

// Create a lift
router.post('', (req, res) => {
    var body = req.body
    var fields = ['categoryID', 'name', 'description']
    var values = [body.categoryID, body.name, body.description]
    dbUtils.insert(res, table, fields, values, ['*'], 'Lift saved', 'Lift not saved')
})

// Get all lifts
router.get('/all', (req, res) => {
    dbUtils.selectAllWhere(res, table, ['*'], [], [], 'Lifts found', 'Lifts not found')
})

// Get a lift by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectWhere(res, table, ['*'], ['id'], [id], 'Lift found', `Lift ${id} not found`)
})

// Update a lift by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['categoryID', 'name', 'description']
    var setValues = [body.categoryID, body.name, body.description]
    var id = body.id
    dbUtils.updateOneByID(res, table, setFields, setValues, id, ['*'], 'Lift updated', `Lift ${id} not updated`)
})

// Delete a lift by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, table, req.body.id, `Lift ${id} deleted`, `Lift ${id} not deleted`)
})

module.exports = router
