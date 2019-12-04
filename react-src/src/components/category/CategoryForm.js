import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CategoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
        this.clearFields = this.clearFields.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.sendCategoryRequest(this.state)
            .then(res => {
                const response = res.data
                console.log(response.message)
                if(response.success) {
                    this.clearFields()
                    this.props.getAllCategories()
                } 
            })
    }

    clearFields() {
        this.setState({name: '', description: ''})
    }

    render() {
        return (
            <div>
                <div className='modal fade' id='categoryModal' tabIndex='-1' role='dialog' aria-labelledby='categoryModalLabel' aria-hidden='true'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='categoryModalLabel'>Category Form</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className='modal-body'>
                                <div className='form-group'>
                                    <label htmlFor='nameInput'>Name: </label>
                                    <input className='form-control' id='nameInput' name='name' type='text' onChange={this.onChange} value={this.state.name} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='descInput'>Description: </label>
                                    <textarea className='form-control' id='descInput' name='description' onChange={this.onChange} value={this.state.description} />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                                <button className='btn btn-warning' onClick={this.clearFields}>Clear</button>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CategoryForm.propTypes = {
    sendCategoryRequest: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired
}