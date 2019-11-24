const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

// Create a lift_set
router.post('', (req, res) => {
    var body = req.body
    var fields = ['workout_lift_id', 'weight', 'reps']
    var values = [body.workout_lift_id, body.weight, body.reps]
    dbUtils.insert(res, 'lift_set', fields, values, ['*'], 'Lift_set saved', 'Lift_set not saved')
})

// Get all lift_sets
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, 'lift_set', ['*'], 'Lift_sets found', 'Lift_sets not found')
})

// Get a lift_set by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectByID(res, 'lift_set', ['*'], id, 'Lift_set found', `Lift_set ${id} not found`)
})

// Update a lift_set by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['workout_lift_id', 'weight', 'reps']
    var setValues = [body.workout_lift_id, body.weight, body.reps]
    var id = body.id
    dbUtils.updateOneByID(res, 'lift_set', setFields, setValues, id, ['*'], 'Lift_set updated', `Lift_set ${id} not updated`)
})

// Delete a lift_set by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, 'lift_set', req.body.id, `Lift_set ${id} deleted`, `Lift_set ${id} not deleted`)
})

module.exports = router