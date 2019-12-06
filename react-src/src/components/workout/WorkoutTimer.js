import React from 'react'
import PropTypes from 'prop-types'

export default function WorkoutTimer(props) {
    var workoutTime = (<div></div>)
    var button = (<div></div>)
    if (props.isInProgress) {
        var workoutTime = (<div>{props.workoutLength}</div>)
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
    workoutLength: PropTypes.any.isRequired,
    startWorkout: PropTypes.func.isRequired,
    endWorkout: PropTypes.func.isRequired
}
