import { GET_ALL_CATEGORIES, CREATE_A_CATEGORY} from './types'
import { getAll, createOne } from './utils'

const urlRoute = 'category'

export const getAllCategories = () => dispatch => {
    getAll(GET_ALL_CATEGORIES, dispatch, urlRoute)
}

export const createACategory = (categoryData) => dispatch => {
    createOne(CREATE_A_CATEGORY, dispatch, urlRoute, categoryData)
}