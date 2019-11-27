import { GET_ALL_CATEGORIES, CREATE_A_CATEGORY } from '../actions/types'
import { initialState } from './state'

export default function(state = initialState, action) { // 'state = initial state'  sets the default parameter
    switch(action.type) {
        case GET_ALL_CATEGORIES:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign 
            return { 
                ...state,
                categories: action.jsonRes.data
            }
        case CREATE_A_CATEGORY:
            return {
                ...state,
                category: action.jsonRes.data
            }
        default:
            return state
    }
}