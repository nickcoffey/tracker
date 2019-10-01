const index = require('../index')
const mongoose = index.mongoose
const Schema = index.Schema

let categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Category', categorySchema)