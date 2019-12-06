import React from 'react'
import PropTypes from 'prop-types'

export default function DeletePopup(props) {
    return (
        <div className='modal fade' id='deleteModal' tabIndex='-1' role='dialog' aria-labelledby='deleteModalLabel' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='deleteModalLabel'>Delete {props.item}?</h5>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                <div className='modal-body'>
                    Are you sure you want to delete this {props.item.toLowerCase()}?
                </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>No</button>
                        <button type='button' className='btn btn-danger' data-dismiss='modal' onClick={props.onDelete}>Delete {props.item}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

DeletePopup.propTypes = {
    item: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}
