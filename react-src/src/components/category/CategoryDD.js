import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class CategoryDD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
        this.getAllCategories = this.getAllCategories.bind(this)
    }

    getAllCategories() {
        axios.get('http://localhost:2000/api/category/all')
            .then(res => {
                this.setState({categories: res.data.data})
            })
    }

    componentDidMount() {
        this.getAllCategories()
    }

    render() {
        const categories = this.state.categories.map(category => (
            <option value={category.id} key={category.id}>
                {`${category.name} - ${category.description}`}
            </option>
        ))

        return (
            <div>
                <select className='form-control' onChange={this.props.onChange} id='category' name='category'>
                    <option value={0}></option>
                    {categories}
                </select>
            </div>
        )
    }
}

CategoryDD.propTypes = {
    onChange: PropTypes.func.isRequired
}
