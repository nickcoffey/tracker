var expect = require('chai').expect
var testUtils = require('./testUtils')

describe('Workout_lift API', () => {
    var url = '/api/workout_lift'
    var workout_liftID = 0
    var notFoundWorkout_liftID = 0
    var workout_id = 1
    var name = 'test'
    var description = 'qwerty'
    var updateName = 'updatedName'
    var updateDesc = 'updatedDesc'

    describe('Create', () => {
        it('should create a new workout_lift', (done) => {
            testUtils.post(url, {workout_id: `${workout_id}`, name: name, description: description})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Workout_lift saved')
                    expect(data.id).to.be.a('number')
                    expect(data.workout_id).to.equal(workout_id)
                    expect(data.name).to.equal(name)
                    expect(data.description).to.equal(description)
                    workout_liftID = data.id
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all workout_workout_lifts', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    var data = res.body.data[0]
                    testUtils.checkResponse(res.body, true, 'Workout_lifts found')
                    expect(data.id).to.be.a('number')
                    expect(data.workout_id).to.be.a('number')
                    expect(data.name).to.be.a('string')
                    expect(data.description).to.be.a('string')
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, {id: notFoundWorkout_liftID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Workout_lift ${notFoundWorkout_liftID} not found`)
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct workout_lift', (done) => {
            testUtils.get(url, {id: workout_liftID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Workout_lift found')
                    expect(data.id).to.equal(workout_liftID)
                    expect(data.workout_id).to.equal(workout_id)
                    expect(data.name).to.equal(name)
                    expect(data.description).to.equal(description)
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, {id: notFoundWorkout_liftID, workout_id: '0', name: updateName, description: updateDesc})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Workout_lift ${notFoundWorkout_liftID} not updated`)
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one workout_lift', (done) => {
            testUtils.put(url, {id: workout_liftID, workout_id: `${workout_id}`,name: updateName, description: updateDesc})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Workout_lift updated')
                    expect(data.id).to.equal(workout_liftID)
                    expect(data.workout_id).to.equal(workout_id)
                    expect(data.name).to.equal(updateName)
                    expect(data.description).to.equal(updateDesc)
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, {id: notFoundWorkout_liftID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Workout_lift ${notFoundWorkout_liftID} not deleted`)
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one workout_lift', (done) => {
            testUtils.del(url, {id: workout_liftID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, `Workout_lift ${workout_liftID} deleted`)
                    done()
                })
        })
    })
})