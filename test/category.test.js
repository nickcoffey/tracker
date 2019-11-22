var expect = require('chai').expect
var testUtils = require('./testUtils')

describe('Category API', () => {
    var url = '/api/category'
    var catID = 0
    var notFoundCatID = 0
    var name = 'test'
    var description = 'qwerty'
    var updateName = 'updatedName'
    var updateDesc = 'updatedDesc'

    describe('Create', () => {
        it('should create a new category', (done) => {
            testUtils.post(url, {name: name, description: description})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Category saved')
                    expect(data.id).to.be.a('number')
                    expect(data.name).to.equal(name)
                    expect(data.description).to.equal(description)
                    catID = data.id
                    done()
                })
        })
    })

    describe('Get All', () => {
        it('should return all categories', (done) => {
            testUtils.get(`${url}/all`, {})
                .end((err, res) => {
                    var data = res.body.data[0]
                    testUtils.checkResponse(res.body, true, 'Categories found')
                    expect(data.id).to.be.a('number')
                    expect(data.name).to.be.a('string')
                    expect(data.description).to.be.a('string')
                    done()
                })
        })
    })

    describe('Get One By ID - Not Found', () => {
        it('should return a not found message', (done) => {
            testUtils.get(url, {id: notFoundCatID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Category ${notFoundCatID} not found`)
                    done()
                })
        })
    })

    describe('Get One By ID', () => {
        it('should return the correct category', (done) => {
            testUtils.get(url, {id: catID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Category found')
                    expect(data.id).to.equal(catID)
                    expect(data.name).to.equal(name)
                    expect(data.description).to.equal(description)
                    done()
                })
        })
    })

    describe('Update One - Not Found', () => {
        it('should return a not updated message', (done) => {
            testUtils.put(url, {id: notFoundCatID, 'name': updateName, description: updateDesc})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Category ${notFoundCatID} not updated`)
                    done()
                })
        })
    })

    describe('Update One By ID', () => {
        it('should update one category', (done) => {
            testUtils.put(url, {id: catID, 'name': updateName, description: updateDesc})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, 'Category updated')
                    expect(data.id).to.equal(catID)
                    expect(data.name).to.equal(updateName)
                    expect(data.description).to.equal(updateDesc)
                    done()
                })
        })
    })

    describe('Delete One - Not Found', () => {
        it('should return a not deleted message', (done) => {
            testUtils.del(url, {id: notFoundCatID})
                .end((err, res) => {
                    testUtils.checkResponse(res.body, false, `Category ${notFoundCatID} not deleted`)
                    done()
                })
        })
    })

    describe('Delete One By ID', () => {
        it('should delete one category', (done) => {
            testUtils.del(url, {id: catID})
                .end((err, res) => {
                    var data = res.body.data
                    testUtils.checkResponse(res.body, true, `Category ${catID} deleted`)
                    done()
                })
        })
    })
})