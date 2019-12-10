import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { createDateFormat, displayDateFormat, timeZone } from '../../util/DateUtils'

export default function WorkoutDetails(props) {
    var details = (<div></div>)
    if(!props.isNew && !props.isInProgress && props.endtime !== 'Not found') {
        details = (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <strong>Date Started: </strong>
                        {moment().tz(timeZone).format(displayDateFormat)}
                    </div>
                    <div className='col'>
                        <strong>Workout Length: </strong>
                        {moment(moment(props.endtime, createDateFormat).diff(moment(props.starttime, createDateFormat))).format('mm:ss')}
                    </div>
                </div>
                <div>
                    <button type='button' className='btn btn-danger' data-toggle='modal' data-target='#deleteModal'>Delete Workout</button>
                </div>
            </div>
        )
    }

    return (details)
}

WorkoutDetails.propTypes = {
    starttime: PropTypes.string,
    endtime: PropTypes.string,
    isNew: PropTypes.bool.isRequired,
    isInProgress: PropTypes.bool.isRequired
}
