import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() { // to avoid auto submitting
        this.props.onSubmit(this.state)
    }

    onChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    componentDidMount() {
        this.props.inputs.forEach(input => {
            this.setState({[input.id]: input.value})
        })
    }

    render() {
        const inputs = this.props.inputs.map(input => (
            <div className='form-group' key={input.id}>
                <label htmlFor={input.id}>{input.label}: </label>
                <input type={input.type} className='form-control' id={input.id} name={input.id} value={this.state.value} onChange={this.onChange} />
            </div>
        ))

        return (
            <div className='modal fade' id='formModal' tabIndex='-1' role='dialog' aria-labelledby='formModalLabel' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='formModalLabel'>Form Popup</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                    <form onSubmit={this.onSubmit}>
                        <div className='modal-body'>{inputs}</div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='reset' className='btn btn-warning'>Clear</button>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

FormPopup.propTypes = {
    inputs: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
}
