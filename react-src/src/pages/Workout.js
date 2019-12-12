import React, { Component } from 'react'
import Table from '../components/common/Table'
import FormPopup from '../components/common/FormPopup'
import DeletePopup from '../components/common/DeletePopup'
import WorkoutHeader from '../components/workout/WorkoutHeader'
import WorkoutTimer from '../components/workout/WorkoutTimer'
import WorkoutDetails from '../components/workout/WorkoutDetails'
import { timeZone, createDateFormat } from '../util/DateUtils'
import { getAllByID, getOneByID, createOne, updateOneByID, deleteOneByID } from '../util/APIUtils'
import moment from 'moment-timezone'

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
        this.updateWorkout = this.updateWorkout.bind(this)
        this.deleteWorkout = this.deleteWorkout.bind(this)
        this.getInputValues = this.getInputValues.bind(this)
    }

    startWorkout() {
        const newWorkout = {
            id: this.state.id,
            starttime: moment().tz(timeZone).format(createDateFormat),
            endtime: null
        }
        createOne('workout', newWorkout).then(workout => {
            if(workout.id !== undefined && workout.id !== 0) {
                workout.endtime = moment().tz(timeZone).format(createDateFormat)
                this.setState(workout)
                this.setState({isNew: false, isInProgress: true})
                this.startWorkoutTimer()
                getAllByID('workoutLift', this.state.id).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
            }
        })
    }

    startWorkoutTimer() {
        var intervalID = setInterval(() => {
            this.setState({endtime: moment().tz(timeZone).format(createDateFormat)})
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

    updateWorkout(values) {
        updateOneByID('workout', {...values, id: this.state.id}).then(data => {
            if(data.id !== undefined) {
                this.setState(data)
            }
        })
    }

    deleteWorkout() {
        deleteOneByID('workout', this.state.id).then(data => {
            if(data.id === undefined) {
                this.props.history.push('/')
            }
        })
    }

    getInputValues() {
        return {
            starttime: this.state.starttime,
            endtime: this.state.endtime
        }
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

        const inputs = [
            {
                id: 'starttime', 
                label: 'Start Time', 
                type: 'text'
            },
            {
                id: 'endtime', 
                label: 'End Time', 
                type: 'text'
            }
        ]

        return (
            <div>
                <WorkoutHeader isNew={this.state.isNew} />
                <WorkoutTimer isNew={this.state.isNew} isInProgress={this.state.isInProgress} starttime={this.state.starttime} endtime={this.state.endtime} startWorkout={this.startWorkout} endWorkout={this.endWorkout} />
                <WorkoutDetails isNew={this.state.isNew} isInProgress={this.state.isInProgress} starttime={this.state.starttime} endtime={this.state.endtime} />
                <FormPopup inputs={inputs} onSubmit={this.updateWorkout} isUpdate={true} getValues={this.getInputValues} />
                <DeletePopup item='Workout' onDelete={this.deleteWorkout} />
                {/* <h3>Lifts</h3>
                <Form onSubmit={() => {}} inputs={[input]} />
                <Table headerColumns={['ID', 'Name', 'Description']} bodyRows={workoutLifts} /> */}
            </div>
        )
    }
}
