const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')
var selectReturnFields = ["id", "to_char(start_time, 'MM/DD/YYYY HH:MI AM') as start_time", "to_char(end_time, 'MM/DD/YYYY HH:MI AM') as end_time"]

// Create a workout
router.post('', (req, res) => {
    var body = req.body
    var fields = ['start_time', 'end_time']
    var values = [body.start_time, body.end_time]
    dbUtils.insert(res, 'workout', fields, values, selectReturnFields, 'Workout saved', 'Workout not saved')
})

// Get all workouts
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, 'workout', selectReturnFields, 'Workouts found', 'Workouts not found')
})

// Get a workout by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectWhere(res, 'workout', selectReturnFields, ['id'], [id], 'Workout found', `Workout ${id} not found`)
})

// Update a workout by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['start_time', 'end_time']
    var setValues = [body.start_time, body.end_time]
    var id = body.id
    dbUtils.updateOneByID(res, 'workout', setFields, setValues, id, selectReturnFields, 'Workout updated', `Workout ${id} not updated`)
})

// Delete a workout by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, 'workout', req.body.id, `Workout ${id} deleted`, `Workout ${id} not deleted`)
})

module.exports = router