const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

var table = 'liftSet'

// Create a liftSet
router.post('', (req, res) => {
    var body = req.body
    var fields = ['workoutLiftID', 'weight', 'reps']
    var values = [body.workoutLiftID, body.weight, body.reps]
    dbUtils.insert(res, table, fields, values, ['*'], 'LiftSet saved', 'LiftSet not saved')
})

// Get all liftSets
router.get('/all', (req, res) => {
    dbUtils.selectAllWhere(res, table, ['*'], [], [], 'LiftSets found', 'LiftSets not found')
})

// Get a liftSet by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectWhere(res, table, ['*'], ['id'], [id], 'LiftSet found', `LiftSet ${id} not found`)
})

// Update a liftSet by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['workoutLiftID', 'weight', 'reps']
    var setValues = [body.workoutLiftID, body.weight, body.reps]
    var id = body.id
    dbUtils.updateOneByID(res, table, setFields, setValues, id, ['*'], 'LiftSet updated', `LiftSet ${id} not updated`)
})

// Delete a liftSet by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, table, req.body.id, `LiftSet ${id} deleted`, `LiftSet ${id} not deleted`)
})

module.exports = router
