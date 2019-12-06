import axios from 'axios'

const port = process.env.IS_HEROKU === 'true' ? process.env.PORT : 2000
const URL = `http://localhost:${port}/api`

export function returnValue(json, isArray) {
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

export function updateOneByID(table, body) {
        return axios.put(`${URL}/${table}`, body)
                .then(res => {
                        return returnValue(res.data, false)
                })
                .catch(err => { return {} })
}

export function deleteOneByID(table, id) {
        return axios.delete(`${URL}/${table}/${id}`)
                .then(res => {
                        return returnValue(res.data, false)
                })
                .catch(err => { return {} })
}
