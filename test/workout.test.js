var expect = require('chai').expect
var testUtils = require('./testUtils')
var describe = testUtils.describe
var it = testUtils.it

describe('Workout API', () => {
    var url = '/api/workout'
    var workoutID = 0
    var notFoundWorkoutID = 0
    var startTime = '2019-11-22 17:00'
    var startTimeFmt = '11/22/2019 05:00 PM'
    var endTime = '2019-11-22 17:45'
    var endTimeFmt = '11/22/2019 05:45 PM'
    var updatedStartTime = '2016-01-15 00:00:00'
    var updatedStartTimeFMT = '01/15/2016 12:00 AM'
    var updatedEndTime = '2016-01-15 00:30:00'
    var updatedEndTimeFMT = '01/15/2016 12:30 AM'

    describe('Create', () => {
        it('should create a new workout', (done) => {
            testUtils.post(url, { startTime: startTime, endTime: endTime })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'Workout saved')
                        expect(data.id).to.be.a('number')
                        expect(data.starttime).to.equal(startTimeFmt)
                        expect(data.endtime).to.equal(endTimeFmt)
                        workoutID = data.id
                    }
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all workouts', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data[0]
                        testUtils.checkResponse(res.body, true, 'Workouts found')
                        expect(data.id).to.be.a('number')
                        expect(data.starttime).to.be.a('string')
                        expect(data.endtime).to.be.a('string')
                    }
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, { id: notFoundWorkoutID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `Workout ${notFoundWorkoutID} not found`)
                    }
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct workout', (done) => {
            testUtils.get(url, { id: workoutID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'Workout found')
                        expect(data.id).to.equal(workoutID)
                        expect(data.starttime).to.equal(startTimeFmt)
                        expect(data.endtime).to.equal(endTimeFmt)
                    }
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, { id: notFoundWorkoutID, startTime: updatedStartTime, endTime: updatedEndTime })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `Workout ${notFoundWorkoutID} not updated`)
                    }
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one workout', (done) => {
            testUtils.put(url, { id: workoutID, startTime: updatedStartTime, endTime: updatedEndTime })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'Workout updated')
                        expect(data.id).to.equal(workoutID)
                        expect(data.starttime).to.equal(updatedStartTimeFMT)
                        expect(data.endtime).to.equal(updatedEndTimeFMT)
                    }
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, { id: notFoundWorkoutID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `Workout ${notFoundWorkoutID} not deleted`)
                    }
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one workout', (done) => {
            testUtils.del(url, { id: workoutID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, true, `Workout ${workoutID} deleted`)
                    }
                    done()
                })
        })
    })
})
