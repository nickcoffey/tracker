import React, { Component } from 'react'
import CategoryDD from'../category/CategoryDD'

export default class AddWorkoutLift extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 0
        }
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onCategoryChange(event) {
        this.setState({[event.target.name]: parseInt(event.target.value)})
    }

    onSubmit(event) {
        event.preventDefault()

    }

    render() {
        return (
            <div>
                <h3>Add A Lift</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='categoryInput'>Select A Category: </label>
                        <CategoryDD onChange={this.onCategoryChange} />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
    }
}
