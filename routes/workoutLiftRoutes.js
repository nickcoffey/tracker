const express = require('express')
const router = express.Router()
const dbUtils = require('../util/dbUtils')

var table = 'workoutLift'

// Create a workoutLift
router.post('', (req, res) => {
    var body = req.body
    var fields = ['workoutID', 'name', 'description']
    var values = [body.workoutID, body.name, body.description]
    dbUtils.insert(res, table, fields, values, ['*'], 'WorkoutLift saved', 'WorkoutLift not saved')
})

// Get all workoutLifts
router.get('/all', (req, res) => {
    dbUtils.selectAllWhere(res, table, ['*'], [], [], 'WorkoutLifts found', 'WorkoutLifts not found')
})

// Get a workoutLift by id
router.get('', (req, res) => {
    var id = req.body.id
    dbUtils.selectWhere(res, table, ['*'], ['id'], [id], 'WorkoutLift found', `WorkoutLift ${id} not found`)
})

// Update a workoutLift by id
router.put('', (req, res) => {
    var body = req.body
    var setFields = ['workoutID', 'name', 'description']
    var setValues = [body.workoutID, body.name, body.description]
    var id = body.id
    dbUtils.updateOneByID(res, table, setFields, setValues, id, ['*'], 'WorkoutLift updated', `WorkoutLift ${id} not updated`)
})

// Delete a workoutLift by id
router.delete('', (req, res) => {
    var id = req.body.id
    dbUtils.deleteOneByID(res, table, req.body.id, `WorkoutLift ${id} deleted`, `WorkoutLift ${id} not deleted`)
})

module.exports = router
