var expect = require('chai').expect
var testUtils = require('./testUtils')
var describe = testUtils.describe
var it = testUtils.it

describe('WorkoutLift API', () => {
    var url = '/api/workoutLift'
    var workoutLiftID = 0
    var notFoundWorkoutLiftID = 0
    var workoutID = 1
    var name = 'test'
    var description = 'qwerty'
    var updateName = 'updatedName'
    var updateDesc = 'updatedDesc'

    describe('Create', () => {
        it('should create a new workoutLift', (done) => {
            testUtils.post(url, { workoutID: `${workoutID}`, name: name, description: description })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'WorkoutLift saved')
                        expect(data.id).to.be.a('number')
                        expect(data.workoutid).to.equal(workoutID)
                        expect(data.name).to.equal(name)
                        expect(data.description).to.equal(description)
                        workoutLiftID = data.id
                    }
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all workoutLifts', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data[0]
                        testUtils.checkResponse(res.body, true, 'WorkoutLifts found')
                        expect(data.id).to.be.a('number')
                        expect(data.workoutid).to.be.a('number')
                        expect(data.name).to.be.a('string')
                        expect(data.description).to.be.a('string')
                    }
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, { id: notFoundWorkoutLiftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `WorkoutLift ${notFoundWorkoutLiftID} not found`)
                    }
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct workoutLift', (done) => {
            testUtils.get(url, { id: workoutLiftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'WorkoutLift found')
                        expect(data.id).to.equal(workoutLiftID)
                        expect(data.workoutid).to.equal(workoutID)
                        expect(data.name).to.equal(name)
                        expect(data.description).to.equal(description)
                    }
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, { id: notFoundWorkoutLiftID, workoutID: '0', name: updateName, description: updateDesc })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `WorkoutLift ${notFoundWorkoutLiftID} not updated`)
                    }
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one workoutLift', (done) => {
            testUtils.put(url, { id: workoutLiftID, workoutID: `${workoutID}`, name: updateName, description: updateDesc })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'WorkoutLift updated')
                        expect(data.id).to.equal(workoutLiftID)
                        expect(data.workoutid).to.equal(workoutID)
                        expect(data.name).to.equal(updateName)
                        expect(data.description).to.equal(updateDesc)
                    }
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, { id: notFoundWorkoutLiftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `WorkoutLift ${notFoundWorkoutLiftID} not deleted`)
                    }
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one workoutLift', (done) => {
            testUtils.del(url, { id: workoutLiftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, true, `WorkoutLift ${workoutLiftID} deleted`)
                    }
                    done()
                })
        })
    })
})
