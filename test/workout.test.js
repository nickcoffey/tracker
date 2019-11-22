var expect = require('chai').expect
var testUtils = require('./testUtils')

describe('Workout API', () => {
    var url = '/api/workout'
    var workoutID = 0
    var notFoundWorkoutID = 0
    var start_time = '2019-11-22 17:00'
    var start_time_fmt = '11/22/2019 05:00 PM'
    var end_time = '2019-11-22 17:45'
    var end_time_fmt = '11/22/2019 05:45 PM'
    var updatedStartTime = '2016-01-15 00:00:00'
    var updatedStartTimeFMT = '01/15/2016 12:00 AM'
    var updatedEndTime = '2016-01-15 00:30:00'
    var updatedEndTimeFMT = '01/15/2016 12:30 AM'

    describe('Create', () => {
        it('should create a new workout', (done) => {
            testUtils.post(url, {start_time: start_time, end_time: end_time})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Workout saved')
                    expect(data.id).to.be.a('number')
                    expect(data.start_time).to.equal(start_time_fmt)
                    expect(data.end_time).to.equal(end_time_fmt)
                    workoutID = data.id
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all workouts', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    var data = res.body.data[0]
                    testUtils.checkResponse(res.body, true, 'Workouts found')
                    expect(data.id).to.be.a('number')
                    expect(data.start_time).to.be.a('string')
                    expect(data.end_time).to.be.a('string')
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, {id: notFoundWorkoutID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Workout ${notFoundWorkoutID} not found`)
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct workout', (done) => {
            testUtils.get(url, {id: workoutID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Workout found')
                    expect(data.id).to.equal(workoutID)
                    expect(data.start_time).to.equal(start_time_fmt)
                    expect(data.end_time).to.equal(end_time_fmt)
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, {id: notFoundWorkoutID, start_time: updatedStartTime, end_time: updatedEndTime})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Workout ${notFoundWorkoutID} not updated`)
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one workout', (done) => {
            testUtils.put(url, {id: workoutID, start_time: updatedStartTime, end_time: updatedEndTime})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Workout updated')
                    expect(data.id).to.equal(workoutID)
                    expect(data.start_time).to.equal(updatedStartTimeFMT)
                    expect(data.end_time).to.equal(updatedEndTimeFMT)
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, {id: notFoundWorkoutID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Workout ${notFoundWorkoutID} not deleted`)
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one workout', (done) => {
            testUtils.del(url, {id: workoutID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, `Workout ${workoutID} deleted`)
                    done()
                })
        })
    })
})