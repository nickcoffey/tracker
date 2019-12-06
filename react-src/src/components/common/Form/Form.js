import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
    constructor(props) {
        super(props)
        // this.clearFields = this.clearFields.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const inputs = this.props.inputs.map(input => (
            <div className='form-group' key={input.id}>
                <label htmlFor={input.id}>{input.label}: </label>
                <input type={input.type} className='form-control' id={input.id} name={input.id} onChange={this.onChange} value={input.value} />
            </div>
        ))

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {inputs}
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    inputs: PropTypes.array.isRequired
}
