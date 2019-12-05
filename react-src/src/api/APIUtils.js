import axios from 'axios'

const URL = 'http://localhost:2000/api'

export default function getAllByID(table, id) {
        return axios.get(`${URL}/${table}/all/${id}`).catch(err => {})
}
