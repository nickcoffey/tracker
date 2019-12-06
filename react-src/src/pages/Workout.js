import React, { Component } from 'react'
import AddWorkoutLift from '../components/workoutlift/AddWorkoutLift'
import Table from '../components/common/Table'
import { getAllByID, getOneByID } from '../api/APIUtils'

export default class Workout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 'Not found',
            starttime: 'Not found',
            endtime: 'Not found',
            workoutLifts: []
        }
    }

    componentDidMount() {
        const workoutID = this.props.match.params.id
        getOneByID('workout', workoutID).then(workout => this.setState(workout))
        getAllByID('workoutLift', workoutID).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
    }

    render() {
        const workout = (
            <tr>
                <td>{this.state.id}</td>
                <td>{this.state.starttime}</td>
                <td>{this.state.endtime}</td>
            </tr>
        )
        const workoutLifts = this.state.workoutLifts.map(workoutLift => (
            <tr key={workoutLift.id}>
                <td>{workoutLift.id}</td>
                <td>{workoutLift.name}</td>
                <td>{workoutLift.description}</td>
            </tr>
        ))

        return (
            <div>
                <h1>Workout </h1>
                <Table headerColumns={['ID', 'Start Time', 'End Time']} bodyRows={workout} />
                <h3>Lifts</h3>
                <Table headerColumns={['ID', 'Name', 'Description']} bodyRows={workoutLifts} />
                {/* <AddWorkoutLift /> */}
            </div>
        )
    }
}
