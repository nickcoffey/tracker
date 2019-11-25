var expect = require('chai').expect
var testUtils = require('./testUtils')
var describe = testUtils.describe
var it = testUtils.it

describe('Lift API', () => {
    var url = '/api/lift'
    var liftID = 0
    var notFoundLiftID = 0
    var categoryID = 1
    var name = 'test'
    var description = 'qwerty'
    var updateName = 'updatedName'
    var updateDesc = 'updatedDesc'

    describe('Create', () => {
        it('should create a new lift', (done) => {
            testUtils.post(url, { categoryID: `${categoryID}`, name: name, description: description })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'Lift saved')
                        expect(data.id).to.be.a('number')
                        expect(data.categoryid).to.equal(categoryID)
                        expect(data.name).to.equal(name)
                        expect(data.description).to.equal(description)
                        liftID = data.id
                    }
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all lifts', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data[0]
                        testUtils.checkResponse(res.body, true, 'Lifts found')
                        expect(data.id).to.be.a('number')
                        expect(data.categoryid).to.be.a('number')
                        expect(data.name).to.be.a('string')
                        expect(data.description).to.be.a('string')
                    }
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, { id: notFoundLiftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `Lift ${notFoundLiftID} not found`)
                    }
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct lift', (done) => {
            testUtils.get(url, { id: liftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'Lift found')
                        expect(data.id).to.equal(liftID)
                        expect(data.categoryid).to.equal(categoryID)
                        expect(data.name).to.equal(name)
                        expect(data.description).to.equal(description)
                    }
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, { id: notFoundLiftID, categoryID: '0', name: updateName, description: updateDesc })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `Lift ${notFoundLiftID} not updated`)
                    }
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one lift', (done) => {
            testUtils.put(url, { id: liftID, categoryID: `${categoryID}`, name: updateName, description: updateDesc })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var data = res.body.data
                        testUtils.checkResponse(res.body, true, 'Lift updated')
                        expect(data.id).to.equal(liftID)
                        expect(data.categoryid).to.equal(categoryID)
                        expect(data.name).to.equal(updateName)
                        expect(data.description).to.equal(updateDesc)
                    }
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, { id: notFoundLiftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, false, `Lift ${notFoundLiftID} not deleted`)
                    }
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one lift', (done) => {
            testUtils.del(url, { id: liftID })
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        testUtils.checkResponse(res.body, true, `Lift ${liftID} deleted`)
                    }
                    done()
                })
        })
    })
})
