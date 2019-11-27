export const getURL = function(urlBase, isGetAll) {
    var url = `http://localhost:2000/api/${urlBase}`
    if(isGetAll === true) {
        url += '/all'
    }
    return url
}

export const getAll = function(type, dispatch, urlRoute) {
    fetch(getURL(urlRoute, true))
    .then(rawRes => rawRes.json())
    .then(jsonRes => dispatch({
        type: type,
        jsonRes: jsonRes
    }))
}

export const createOne = function(type, dispatch, urlRoute, categoryData) {
    fetch(getURL(urlRoute, false), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        })
        .then(rawRes => rawRes.json())
        .then(jsonRes => dispatch({
            type: type,
            jsonRes: jsonRes
        }))
}