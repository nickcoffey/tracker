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
            <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
            </tr>
        ))
        return (
            <div>
                <h1>Categories</h1>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories}
                    </tbody>
                </table>
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