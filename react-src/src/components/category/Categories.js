import React, { Component } from 'react'
import axios from 'axios'
import NewCategory from './NewCategory'

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
        this.getAllCategories = this.getAllCategories.bind(this)
    }

    componentDidMount() {
        this.getAllCategories()
    }

    getAllCategories() {
        axios.get('http://localhost:2000/api/category/all')
            .then(res => {
                this.setState({categories: res.data.data})
            })
    }

    render() {
        const categories = this.state.categories.map(category => (
            <option key={category.id}>
                {`${category.name} - ${category.description}`}
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
                <NewCategory getAllCategories={this.getAllCategories} />
            </div>
        )
    }
}
