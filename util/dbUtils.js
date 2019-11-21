const index = require('../index')
const logger = index.logger
const db = index.db

function runQuery(text, values, res, pass_msg, fail_msg, isSelectOrUpdateAll, isDelete) {
    var response = {
        success: false,
        message: fail_msg,
        data: null
    }
    db.query(text, values, (err, db_res) => {
        if(err) {
            logger.error(response.message, err)
        } else if((isDelete == true && db_res.rowCount == 0) || (isDelete == false && db_res.rows.length == 0)) {
            logger.error(response.message)
        } else {
            response.success = true
            response.message = pass_msg
            if(isDelete == false && isSelectOrUpdateAll == false){
                response.data = db_res.rows[0]
                logger.info(response.message, response.data)
            } else {
                response.data = db_res.rows
                logger.info(response.message)
            }
        }
        res.status(200).send(response)
    })
}

module.exports.formatInsertQuery = function formatInsertQuery(table, fields) {
    var fieldText = ''
    var valuesText = ''
    var returnText = 'id,'
    fields.forEach((field, index) => {  
        index += 1
        fieldText += `${field},`
        valuesText += `$${index},`
        returnText += `${field},`
    })
    fieldText = fieldText.slice(0, -1)
    valuesText = valuesText.slice(0, -1)
    returnText = returnText.slice(0, -1)
    return `INSERT INTO ${table}(${fieldText}) VALUES(${valuesText}) RETURNING ${returnText}`
}
module.exports.insert = function insert(res, table, fields, values, pass_msg, fail_msg) {
    var text = this.formatInsertQuery(table, fields)
    runQuery(text, values, res, pass_msg, fail_msg, false, false)
}

module.exports.formatSelectAllQuery = function formatSelectAllQuery(table, fields) {
    var fieldText = ''
    fields.forEach(field => {
        fieldText += `${field},`
    })
    fieldText = fieldText.slice(0, -1)
    return `SELECT ${fieldText} FROM ${table}`
}
module.exports.selectAll = function selectAll(res, table, fields, pass_msg, fail_msg) {
    var text = this.formatSelectAllQuery(table, fields)
    runQuery(text, [], res, pass_msg, fail_msg, true, false)
}

module.exports.formatSelectAllWhereQuery = function formatSelectAllWhereQuery(table, fields) {
    var whereText = ''
    fields.forEach((field, index) => {
        whereText += `${field}=$${index+1} AND `
    })
    whereText = whereText.slice(0, -5)
    return `SELECT * FROM ${table} WHERE ${whereText}`
}
module.exports.selectAllWhere = function selectAllWhere(res, table, fields, values, pass_msg, fail_msg) {
    var text = this.formatSelectAllWhereQuery(table, fields)
    runQuery(text, values, res, pass_msg, fail_msg, true, false)
}
module.exports.selectByID = function selectByID(res, table, fields, values, pass_msg, fail_msg) {
    var text = this.formatSelectAllWhereQuery(table, fields)
    runQuery(text, values, res, pass_msg, fail_msg, false, false)
}

module.exports.formatUpdateWhereQuery = function formatUpdateWhereQuery(table, setFields, whereFields) {
    var index = 0
    var setText = ''
    setFields.forEach(field => {
        index++
        setText += `${field}=$${index},`
    })
    setText = setText.slice(0, -1)
    var whereText = ''
    whereFields.forEach(field => {
        index++
        whereText += `${field}=$${index} AND `
    })
    whereText = whereText.slice(0, -5)
    return `UPDATE ${table} SET ${setText} WHERE ${whereText} RETURNING id,name,description`
}
module.exports.updateAllWhere = function updateAllWhere(res, table, setFields, setValues, whereFields, whereValues, pass_msg, fail_msg) {
    var text = this.formatUpdateWhereQuery(table, setFields, whereFields)
    setValues.push(whereValues)
    runQuery(text, setValues, res, pass_msg, fail_msg, true, false)
}
module.exports.updateOneByID = function updateOneByID(res, table, setFields, setValues, whereID, pass_msg, fail_msg) {
    var text = this.formatUpdateWhereQuery(table, setFields, ['id'])
    setValues.push(whereID)
    runQuery(text, setValues, res, pass_msg, fail_msg, false, false)
}

module.exports.formatDeleteWhereQuery = function formatDeleteWhereQuery(table, whereFields) {
    var whereText = ''
    whereFields.forEach((field, index) => {
        whereText += `${field}=$${index+1} AND `
    })
    whereText = whereText.slice(0, -5)
    return `DELETE FROM ${table} WHERE ${whereText}`
}
module.exports.deleteAllWhere = function deleteAllWhere(res, table, whereFields, whereValues, pass_msg, fail_msg) {
    var text = this.formatDeleteWhereQuery(table, whereFields)
    runQuery(text, setValues, res, pass_msg, fail_msg, false, true)
}
module.exports.deleteOneByID = function deleteOneByID(res, table, whereID, pass_msg, fail_msg) {
    var text = this.formatDeleteWhereQuery(table, ['id'])
    runQuery(text, [whereID], res, pass_msg, fail_msg, false, true)
}