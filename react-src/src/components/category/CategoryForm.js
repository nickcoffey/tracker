import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createACategory } from '../../actions/categoryActions'

class CategoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        const categoryData = {
            name: this.state.name,
            description: this.state.description
        }
        this.props.createACategory(categoryData)
    }

    render() {
        return (
            <div>
                <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#categoryModal'>New Category</button>

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
    createACategory: PropTypes.func.isRequired
}

export default connect(null, { createACategory })(CategoryForm)
