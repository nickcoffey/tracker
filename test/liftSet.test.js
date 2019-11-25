var expect = require('chai').expect
var testUtils = require('./testUtils')
var describe = testUtils.describe
var it = testUtils.it

describe('LiftSet API', () => {
    var url = '/api/liftSet'
    var liftSetID = 0
    var notFoundLiftSetID = 0
    var workoutLiftID = 1
    var weight = 100
    var reps = 10
    var updateWeight = 200
    var updateReps = 4

    describe('Create', () => {
        it('should create a new liftSet', (done) => {
            testUtils.post(url, { workoutLiftID: `${workoutLiftID}`, weight: weight, reps: reps })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'LiftSet saved')
                        expect(data.id).to.be.a('number')
                        expect(data.workoutliftid).to.equal(workoutLiftID)
                        expect(data.weight).to.equal(weight)
                        expect(data.reps).to.equal(reps)
                        liftSetID = data.id
                    }
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all liftSets', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data[0]
                        testUtils.checkResponse(res.body, true, 'LiftSets found')
                        expect(data.id).to.be.a('number')
                        expect(data.workoutliftid).to.be.a('number')
                        expect(data.weight).to.be.a('number')
                        expect(data.reps).to.be.a('number')
                    }
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, { id: notFoundLiftSetID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `LiftSet ${notFoundLiftSetID} not found`)
                    }
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct liftSet', (done) => {
            testUtils.get(url, { id: liftSetID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'LiftSet found')
                        expect(data.id).to.equal(liftSetID)
                        expect(data.workoutliftid).to.equal(workoutLiftID)
                        expect(data.weight).to.equal(weight)
                        expect(data.reps).to.equal(reps)
                    }
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, { id: notFoundLiftSetID, workoutLiftID: '0', weight: updateWeight, reps: updateReps })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `LiftSet ${notFoundLiftSetID} not updated`)
                    }
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one liftSet', (done) => {
            testUtils.put(url, { id: liftSetID, workoutLiftID: `${workoutLiftID}`, weight: updateWeight, reps: updateReps })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'LiftSet updated')
                        expect(data.id).to.equal(liftSetID)
                        expect(data.workoutliftid).to.equal(workoutLiftID)
                        expect(data.weight).to.equal(updateWeight)
                        expect(data.reps).to.equal(updateReps)
                    }
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, { id: notFoundLiftSetID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `LiftSet ${notFoundLiftSetID} not deleted`)
                    }
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one liftSet', (done) => {
            testUtils.del(url, { id: liftSetID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, true, `LiftSet ${liftSetID} deleted`)
                    }
                    done()
                })
        })
    })
})
