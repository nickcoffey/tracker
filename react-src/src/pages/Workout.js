import React, { Component } from 'react'
import Form from '../components/common/Form/Form'
import Table from '../components/common/Table'
import WorkoutHeader from '../components/workout/WorkoutHeader'
import WorkoutTimer from '../components/workout/WorkoutTimer'
import WorkoutDetails from '../components/workout/WorkoutDetails'
import { getAllByID, getOneByID, createOne, updateOneByID } from '../util/APIUtils'
import { getCurrentDateString } from '../util/DateUtils'

export default class Workout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInProgress: false,
            isNew: false,
            intervalID: 0,
            id: 'Not found',
            starttime: 'Not found',
            endtime: 'Not found',
            workoutLifts: []
        }
        this.startWorkout = this.startWorkout.bind(this)
        this.endWorkout = this.endWorkout.bind(this)
        this.startWorkoutTimer = this.startWorkoutTimer.bind(this)
    }

    startWorkout() {
        const newWorkout = {
            id: this.state.id,
            starttime:  getCurrentDateString(),
            endtime: null
        }
        createOne('workout', newWorkout).then(workout => {
            if(workout.id !== undefined && workout.id !== 0) {
                workout.endtime = getCurrentDateString()
                this.setState(workout)
                this.setState({isNew: false, isInProgress: true})
                this.startWorkoutTimer()
                getAllByID('workoutLift', this.state.id).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
            }
        })
    }

    startWorkoutTimer() {
        var intervalID = setInterval(() => {
            this.setState({endtime: getCurrentDateString()})
        }, 1000)
        this.setState({intervalID: intervalID})
    }

    endWorkout() {
        const updatedWorkout = {
            id: this.state.id,
            starttime:  this.state.starttime,
            endtime: this.state.endtime
        }
        updateOneByID('workout', updatedWorkout).then(workout => {
            if(workout.id !== undefined && workout.id === this.state.id) {
                clearInterval(this.state.intervalID)
                this.setState({isInProgress: false, endtime: workout.endtime})
            }
        })
    }

    componentDidMount() {
        const workoutID = this.props.match.params.id
        if(parseInt(workoutID) === 0) {
            this.setState({isNew: true})
        } else {
            getOneByID('workout', workoutID).then(workout => this.setState(workout))
            getAllByID('workoutLift', workoutID).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
        }
    }

    render() {
        const workoutLifts = this.state.workoutLifts.map(workoutLift => (
            <tr key={workoutLift.id}>
                <td>{workoutLift.id}</td>
                <td>{workoutLift.name}</td>
                <td>{workoutLift.description}</td>
            </tr>
        ))

        // const input = {
        //     id: 'name',
        //     label: 'Name',
        //     value: ''
        // }

        return (
            <div>
                <WorkoutHeader isNew={this.state.isNew} />
                <WorkoutTimer isNew={this.state.isNew} isInProgress={this.state.isInProgress} starttime={this.state.starttime} endtime={this.state.endtime} startWorkout={this.startWorkout} endWorkout={this.endWorkout} />
                <WorkoutDetails isNew={this.state.isNew} isInProgress={this.state.isInProgress} starttime={this.state.starttime} endtime={this.state.endtime} />
                {/* <h3>Lifts</h3>
                <Form onSubmit={() => {}} inputs={[input]} />
                <Table headerColumns={['ID', 'Name', 'Description']} bodyRows={workoutLifts} /> */}
            </div>
        )
    }
}
