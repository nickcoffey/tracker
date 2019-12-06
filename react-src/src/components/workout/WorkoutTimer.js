import React from 'react'
import PropTypes from 'prop-types'
import { millisToMinutesAndSeconds } from '../../util/DateUtils'

export default function WorkoutTimer(props) {
    var workoutTime = (<div></div>)
    var button = (<div></div>)
    if (props.isInProgress) {
        workoutTime = (<h5>{millisToMinutesAndSeconds(Math.abs(new Date(props.endtime) - new Date(props.starttime)))}</h5>)
        button = (<button type='button' className='btn btn-primary btn-lg' onClick={props.endWorkout}>End Workout</button>)
    } else if (props.isNew) {
        button = (<button type='button' className='btn btn-primary btn-lg' onClick={props.startWorkout}>Start Workout</button>)
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
    starttime: PropTypes.string.isRequired,
    endtime: PropTypes.string.isRequired,
    startWorkout: PropTypes.func.isRequired,
    endWorkout: PropTypes.func.isRequired
}
