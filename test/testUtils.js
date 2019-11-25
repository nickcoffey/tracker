var request = require('supertest')
var app = require('../index').app
var expect = require('chai').expect
var mocha = require('mocha')

module.exports.describe = mocha.describe
module.exports.it = mocha.it

module.exports.checkResponse = function checkResponse (body, success, message) {
    expect(body.success).to.equal(success)
    expect(body.message).to.equal(message)
}

module.exports.post = function post (url, body) {
    return request(app).post(url)
        .send(body)
        .set('Content-Type', 'application/json')
}

module.exports.get = function get (url, body) {
    return request(app).get(url)
        .send(body)
        .set('Content-Type', 'application/json')
}

module.exports.put = function put (url, body) {
    return request(app).put(url)
        .send(body)
        .set('Content-Type', 'application/json')
}

module.exports.del = function del (url, body) {
    return request(app).del(url)
        .send(body)
        .set('Content-Type', 'application/json')
}
