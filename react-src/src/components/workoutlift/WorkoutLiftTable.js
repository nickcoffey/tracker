import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class WorkoutLiftTable extends Component {
    constructor(props) {
        super(props)
        this.state ={
            workoutLifts: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:2000/api/workoutLift/all/${this.props.workoutID}`)
        .then(res => {
            var json = res.data
            if(json.success === true) {
                this.setState({workoutLifts: json.data})
            }
        })
    }

    render() {
        const workoutLifts = this.state.workoutLifts.map(workoutLift => (
            <tr key={workoutLift.id}>
                <td>{workoutLift.id}</td>
                <td>{workoutLift.name}</td>
                <td>{workoutLift.description}</td>
            </tr>
        ))
        return (
            <div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutLifts}
                    </tbody>
                </table>
            </div>
        )
    }
}

WorkoutLiftTable.propTypes = {
    workoutID: PropTypes.string.isRequired
}
