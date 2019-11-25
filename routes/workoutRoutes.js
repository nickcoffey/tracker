const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')
var selectReturnFields = ['id', "to_char(startTime, 'MM/DD/YYYY HH:MI AM') as startTime", "to_char(endTime, 'MM/DD/YYYY HH:MI AM') as endTime"]

var table = 'workout'

// Create a workout
router.post('', (req, res) => {
    var body = req.body
    var fields = ['startTime', 'endTime']
    var values = [body.startTime, body.endTime]
    dbUtils.insert(res, table, fields, values, selectReturnFields, 'Workout saved', 'Workout not saved')
})

// Get all workouts
router.get('/all', (req, res) => {
    dbUtils.selectAll(res, table, selectReturnFields, 'Workouts found', 'Workouts not found')
})

// Get a workout by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectWhere(res, table, selectReturnFields, ['id'], [id], 'Workout found', `Workout ${id} not found`)
})

// Update a workout by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['startTime', 'endTime']
    var setValues = [body.startTime, body.endTime]
    var id = body.id
    dbUtils.updateOneByID(res, table, setFields, setValues, id, selectReturnFields, 'Workout updated', `Workout ${id} not updated`)
})

// Delete a workout by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, table, req.body.id, `Workout ${id} deleted`, `Workout ${id} not deleted`)
})

module.exports = router
