import React, { Component } from 'react'
import Form from '../components/common/Form/Form'
import Table from '../components/common/Table'
import { getAllByID, getOneByID, createOne, updateOneByID } from '../api/APIUtils'

export default class Workout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInProgress: false,
            isNew: false,
            id: 'Not found',
            starttime: 'Not found',
            endtime: 'Not found',
            workoutLifts: []
        }
        this.startWorkout = this.startWorkout.bind(this)
        this.endWorkout = this.endWorkout.bind(this)
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
                this.setState({isNew: false, isInProgress: true})
                getAllByID('workoutLift', this.state.id).then(workoutLifts => this.setState({workoutLifts: workoutLifts}))
            }
        })
    }

    endWorkout() {
        const updateWorkout = {
            id: this.state.id,
            starttime:  this.state.starttime,
            endtime: this.getCurrentDateString()
        }
        updateOneByID('workout', updateWorkout).then(workout => {
            if(workout.id !== undefined && workout.id !== 0) {
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
        var headerText = 'Workout'
        if (this.state.isNew) {
            headerText = 'New Workout'
        }

        var button = (<div></div>)
        if (this.state.isInProgress) {
            button = (<button type='button' className='btn btn-primary btn-lg' onClick={this.endWorkout}>End Workout</button>)
        } else if (this.state.isNew) {
            button = (<button type='button' className='btn btn-primary btn-lg' onClick={this.startWorkout}>Start Workout</button>)
        }

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
                <h1>{headerText}</h1>
                {button}
                <div className='container'>
                    <div className='row'>
                        <h3 className='col'>Start Time</h3>
                        <h3 className='col'>End Time</h3>
                    </div>
                    <div className='row'>
                        <div className='col'>{this.state.starttime}</div>
                        <div className='col'>{this.state.endtime}</div>
                    </div>
                </div>
                <h3>Lifts</h3>
                {/* <Form onSubmit={() => {}} inputs={[input]} /> */}
                <Table headerColumns={['ID', 'Name', 'Description']} bodyRows={workoutLifts} />
            </div>
        )
    }
}
