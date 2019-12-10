import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { createDateFormat } from '../../util/DateUtils'

export default function WorkoutTimer(props) {
    var workoutTime = (<div></div>)
    var button = (<div></div>)
    if (props.isInProgress) {
        workoutTime = (<h5>{moment(moment(props.endtime, createDateFormat).diff(moment(props.starttime, createDateFormat))).format('mm:ss')}</h5>)
        button = (<button type='button' className='btn btn-primary' onClick={props.endWorkout}>End Workout</button>)
    } else if (props.isNew) {
        button = (<button type='button' className='btn btn-primary' onClick={props.startWorkout}>Start Workout</button>)
    }

    return (
        <div>
            {button}
            {workoutTime}
        </div>
    )
}

WorkoutTimer.propTypes = {
    isNew: PropTypes.bool.isRequired,
    isInProgress: PropTypes.bool.isRequired,
    starttime: PropTypes.string,
    endtime: PropTypes.string,
    startWorkout: PropTypes.func.isRequired,
    endWorkout: PropTypes.func.isRequired
}
