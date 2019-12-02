import { GET_ALL_CATEGORIES, CREATE_A_CATEGORY } from '../actions/types'
import { initialState } from './state'

export default function(state = initialState, action) { // 'state = initialState'  sets the default parameter
    switch(action.type) {
        case GET_ALL_CATEGORIES:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign 
            return { 
                ...state,
                message: action.jsonRes.message,
                success: action.jsonRes.success,
                categories: action.jsonRes.data
            }
        case CREATE_A_CATEGORY:
            return {
                ...state,
                message: action.jsonRes.message,
                success: action.jsonRes.success,
                categories: categories(state.categories, action)
            }
        default:
            return state
    }
}

function categories(state = [], action) {
    switch(action.type) {
        case CREATE_A_CATEGORY:
            var data = action.jsonRes.data
            return [
                ...state,
                {
                    id: data.id,
                    name: data.name,
                    description: data.description
                }
            ]
        default:
            return state
    }
}