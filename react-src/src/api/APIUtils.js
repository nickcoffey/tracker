import axios from 'axios'

const URL = 'http://localhost:2000/api'

function returnValue(json, isArray) {
        var value = {}
        if(isArray) {
                value = []
        }
        if(json.success) {
                value = json.data
        }
        return value
}

export function getAllByID(table, id) {
        return axios.get(`${URL}/${table}/all/${id}`)
                .then(res => {
                        return returnValue(res.data, true)
                })
                .catch(err => { return [] })
}

export function getAll(table) {
        return axios.get(`${URL}/${table}/all`)
                .then(res => {
                        return returnValue(res.data, true)
                })
                .catch(err => { return [] })
}

export function getOneByID(table, id) {
        return axios.get(`${URL}/${table}/${id}`)
                .then(res => {
                        return returnValue(res.data, false)
                })
                .catch(err => { return {} })
}

export function createOne(table, body) {
        return axios.post(`${URL}/${table}`, body)
                .then(res => {
                        return returnValue(res.data, false)
                })
                .catch(err => { return {} })
}
