var expect = require('chai').expect
var testUtils = require('./testUtils')

describe('Lift_set API', () => {
    var url = '/api/lift_set'
    var lift_setID = 0
    var notFoundLift_setID = 0
    var workout_lift_id = 1
    var weight = 100
    var reps = 10
    var updateWeight = 200
    var updateReps = 4

    describe('Create', () => {
        it('should create a new lift_set', (done) => {
            testUtils.post(url, {workout_lift_id: `${workout_lift_id}`, weight: weight, reps: reps})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Lift_set saved')
                    expect(data.id).to.be.a('number')
                    expect(data.workout_lift_id).to.equal(workout_lift_id)
                    expect(data.weight).to.equal(weight)
                    expect(data.reps).to.equal(reps)
                    lift_setID = data.id
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all lift_sets', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    var data = res.body.data[0]
                    testUtils.checkResponse(res.body, true, 'Lift_sets found')
                    expect(data.id).to.be.a('number')
                    expect(data.workout_lift_id).to.be.a('number')
                    expect(data.weight).to.be.a('number')
                    expect(data.reps).to.be.a('number')
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, {id: notFoundLift_setID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Lift_set ${notFoundLift_setID} not found`)
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct lift_set', (done) => {
            testUtils.get(url, {id: lift_setID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Lift_set found')
                    expect(data.id).to.equal(lift_setID)
                    expect(data.workout_lift_id).to.equal(workout_lift_id)
                    expect(data.weight).to.equal(weight)
                    expect(data.reps).to.equal(reps)
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, {id: notFoundLift_setID, workout_lift_id: '0', 'weight': updateWeight, reps: updateReps})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Lift_set ${notFoundLift_setID} not updated`)
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one lift_set', (done) => {
            testUtils.put(url, {id: lift_setID, workout_lift_id: `${workout_lift_id}`,'weight': updateWeight, reps: updateReps})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Lift_set updated')
                    expect(data.id).to.equal(lift_setID)
                    expect(data.workout_lift_id).to.equal(workout_lift_id)
                    expect(data.weight).to.equal(updateWeight)
                    expect(data.reps).to.equal(updateReps)
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, {id: notFoundLift_setID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Lift_set ${notFoundLift_setID} not deleted`)
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one lift_set', (done) => {
            testUtils.del(url, {id: lift_setID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, `Lift_set ${lift_setID} deleted`)
                    done()
                })
        })
    })
})