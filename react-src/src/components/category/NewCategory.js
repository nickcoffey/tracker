import React, { Component } from 'react'
import CategoryForm from './CategoryForm'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class NewCategory extends Component {
    constructor(props) {
        super(props)
        this.sendCategoryRequest = this.sendCategoryRequest.bind(this)
    }
    
    sendCategoryRequest(newCategory) {
        return axios.post('http://localhost:2000/api/category', newCategory)
    }

    render() {
        return (
            <div>
                <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#categoryModal'>New Category</button>
                <CategoryForm sendCategoryRequest={this.sendCategoryRequest} getAllCategories={this.props.getAllCategories} />
            </div>
        )
    }
}

NewCategory.propTypes = {
    getAllCategories: PropTypes.func.isRequired
}
