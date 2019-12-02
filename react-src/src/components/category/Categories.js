import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllCategories } from '../../actions/categoryActions'
import CategoryForm from './CategoryForm'

class Categories extends Component {
    componentDidMount() {
        this.props.getAllCategories()
    }

    render() {
        const categories = this.props.categories.map(category => (
            <option key={category.id}>
                {category.name}
            </option>
        ))
        return (
            <div>
                <h1>Categories</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='categoryInput'>Select A Category: </label>
                        <select className='form-control' id='categoryInput' name='category'>
                            {categories}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
                <hr />
                <CategoryForm />
            </div>
        )
    }
}

Categories.propTypes = {
    getAllCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    categories: state.categoryReducer.categories
})

export default connect(mapStateToProps, { getAllCategories })(Categories)