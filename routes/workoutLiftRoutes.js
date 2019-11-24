const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

// Create a workout_lift
router.post('', (req, res) => {
    var body = req.body
    var fields = ['workout_id', 'name', 'description']
    var values = [body.workout_id, body.name, body.description]
    dbUtils.insert(res, 'workout_lift', fields, values, ['*'], 'Workout_lift saved', 'Workout_lift not saved')
})

// Get all workoutLifts
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, 'workout_lift', ['*'], 'Workout_lifts found', 'Workout_lifts not found')
})

// Get a workout_lift by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectByID(res, 'workout_lift', ['*'], id, 'Workout_lift found', `Workout_lift ${id} not found`)
})

// Update a workout_lift by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['workout_id', 'name', 'description']
    var setValues = [body.workout_id, body.name, body.description]
    var id = body.id
    dbUtils.updateOneByID(res, 'workout_lift', setFields, setValues, id, ['*'], 'Workout_lift updated', `Workout_lift ${id} not updated`)
})

// Delete a workout_lift by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, 'workout_lift', req.body.id, `Workout_lift ${id} deleted`, `Workout_lift ${id} not deleted`)
})

module.exports = router