import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onClear = this.onClear.bind(this)
        this.getCurrentValues = this.getCurrentValues.bind(this)
    }

    onSubmit() { // here to stop auto DB calls
        this.props.onSubmit(this.state)
    }

    getCurrentValues() {
        this.setState(this.props.getValues())
    }

    onChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    onClear() {
        this.props.inputs.forEach(input => {
            this.setState({[input.id]: ''})
        })
    }

    componentDidMount() {
        this.props.inputs.forEach(input => {
            this.setState({[input.id]: ''})
        })
    }

    render() {
        const inputs = this.props.inputs.map(input => (
            <div className='form-group' key={input.id}>
                <label htmlFor={input.id}>{input.label}: </label>
                <input type={input.type} className='form-control' id={input.id} name={input.id} value={this.state[input.id] || ''} onChange={this.onChange} />
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
                    <form>
                        <div className='modal-body'>{inputs}</div>
                        <div className='modal-footer'>
                            {this.props.isUpdate ? <button type='button' className='btn btn-secondary' onClick={this.getCurrentValues}>Get Current Values</button> : null}
                            <button type='reset' className='btn btn-warning' onClick={this.onClear}>Clear</button>
                            <button type='button' className='btn btn-primary' onClick={this.onSubmit} data-dismiss='modal'>Submit</button>
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
    onSubmit: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    getValues: PropTypes.func
}
