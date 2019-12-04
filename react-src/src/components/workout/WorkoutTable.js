import React from 'react'
import PropTypes from 'prop-types'

export default function WorkoutTable(props) {
    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.workouts}
                </tbody>
            </table>
        </div>
    )
}

WorkoutTable.propTypes = {
    workouts: PropTypes.any.isRequired
}
