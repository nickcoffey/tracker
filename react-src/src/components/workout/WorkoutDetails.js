import React from 'react'
import PropTypes from 'prop-types'
import { millisToMinutesAndSeconds } from '../../util/DateUtils'

export default function WorkoutDetails(props) {
    var details = (<div></div>)
    if(!props.isNew && !props.isInProgress && props.endtime !== 'Not found') {
        details = (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <strong>Date Started: </strong>
                        {new Date(props.starttime).toLocaleDateString()}
                    </div>
                    <div className='col'>
                        <strong>Workout Length: </strong>
                        {millisToMinutesAndSeconds(Math.abs(new Date(props.endtime) - new Date(props.starttime)))}
                    </div>
                </div>
            </div>
        )
    }

    return (details)
}

WorkoutDetails.propTypes = {
    starttime: PropTypes.string.isRequired,
    endtime: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
    isInProgress: PropTypes.bool.isRequired
}
