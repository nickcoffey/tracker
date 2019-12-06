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
            workoutTimer: '',
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
            id: 0,
            starttime:  getCurrentDateString(),
            endtime: null
        }
        createOne('workout', newWorkout).then(workout => {
            this.setState(workout)
            if(workout.id !== undefined && workout.id !== 0) {
                this.setState({isNew: false, isInProgress: true})
                this.startWorkoutTimer()
                getAllByID('workoutLift', this.state.id).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
            }
        })
    }

    endWorkout() {
        const updateWorkout = {
            id: this.state.id,
            starttime:  this.state.starttime,
            endtime: getCurrentDateString()
        }
        updateOneByID('workout', updateWorkout).then(workout => {
            if(workout.id !== undefined && workout.id !== 0) {
                clearInterval(this.state.intervalID)
                this.setState({isInProgress: false, endtime: workout.endtime})
            }
        })
    }

    startWorkoutTimer() {
        var intervalID = setInterval(() => {
            var currentDate = new Date(Math.abs(new Date() - new Date(this.state.starttime)))
            this.setState({workoutTimer: `${currentDate.getMinutes()}:${currentDate.getSeconds()}`})
        }, 1000)
        this.setState({intervalID: intervalID})
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
        var details = (<div></div>)
        if(!this.state.isNew && !this.state.isInProgress && this.state.endtime !== 'Not found') {
            details = (<WorkoutDetails starttime={this.state.starttime} endtime={this.state.endtime} />)
        }

        // const input = {
        //     id: 'name',
        //     label: 'Name',
        //     value: ''
        // }

        return (
            <div>
                <WorkoutHeader isNew={this.state.isNew} />
                <WorkoutTimer isNew={this.state.isNew} isInProgress={this.state.isInProgress} workoutLength={this.state.workoutTimer} startWorkout={this.startWorkout} endWorkout={this.endWorkout} />
                {details}
                {/* <h3>Lifts</h3>
                <Form onSubmit={() => {}} inputs={[input]} />
                <Table headerColumns={['ID', 'Name', 'Description']} bodyRows={workoutLifts} /> */}
            </div>
        )
    }
}
