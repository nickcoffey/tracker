import React from 'react'
import PropTypes from 'prop-types'

export default function WorkoutHeader(props) {
    var headerText = 'Workout'
    if (props.isNew) {
        headerText = 'New Workout'
    }

    return (
        <h2>
            {headerText}
        </h2>
    )
}

WorkoutHeader.propTypes = {
    isNew: PropTypes.bool.isRequired
}
