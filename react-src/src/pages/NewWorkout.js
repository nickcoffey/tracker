import React, { Component } from 'react'
import WorkoutForm from '../components/workout/WorkoutForm'
import Table from '../components/common/Table'
import { getAllByID, createOne } from '../api/APIUtils'

export default class NewWorkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            starttime: 'MM/DD/YYYY HH:MM AM',
            endtime: 'MM/DD/YYYY HH:MM AM',
            workoutLifts: []
        }
        this.startWorkout = this.startWorkout.bind(this)
        this.getCurrentDateString = this.getCurrentDateString.bind(this)
        this.convertToFull = this.convertToFull.bind(this)
    }
    
    convertToFull(text) {
        if(text.length === 1) {
            text = `0${text}`
        }
        return text
    }

    getCurrentDateString() {
        var date = new Date()
        var fullHours = this.convertToFull(date.getHours().toString())
        var fullMinutes = this.convertToFull(date.getMinutes().toString())
        var fullMonth = this.convertToFull(date.getMonth().toString())
        var fullDay = this.convertToFull(date.getDate().toString())
        return `${date.getFullYear()}-${fullMonth}-${fullDay} ${fullHours}:${fullMinutes}`
    }

    startWorkout() {
        const newWorkout = {
            id: 0,
            starttime:  this.getCurrentDateString(),
            endtime: null
        }
        createOne('workout', newWorkout).then(workout => {
            this.setState(workout)
            if(workout.id !== undefined && workout.id !== 0) {
                getAllByID('workoutLift', this.state.id).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
            }
        })
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
                <h1>New Workout</h1>
                <button type='button' className='btn btn-primary btn-lg' onClick={this.startWorkout}>Start Workout</button>
                <Table headerColumns={['ID', 'Start Time', 'End Time']} bodyRows={workout} />
                <h3>Lifts</h3>
                <Table headerColumns={['ID', 'Name', 'Description']} bodyRows={workoutLifts} />
                {/* <WorkoutForm /> */}
            </div>
        )
    }
}
