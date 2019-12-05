import axios from 'axios'

const URL = 'http://localhost:2000/api'

export function getAllByID(table, id) {
        return axios.get(`${URL}/${table}/all/${id}`).catch(err => {})
}

export function getAll(table) {
        return axios.get(`${URL}/${table}/all`).catch(err => {})
}

export function getOneByID(table, id) {
        return axios.get(`${URL}/${table}/${id}`).catch(err => {})
}

export function createOne(table, body) {
        return axios.post(`${URL}/${table}`, body).catch(err => {})
}
