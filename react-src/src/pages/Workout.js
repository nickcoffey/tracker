import React, { Component } from 'react'
import axios from 'axios'
import AddWorkoutLift from '../components/workoutlift/AddWorkoutLift'
import Table from '../components/common/Table'
import getAllByID from '../api/APIUtils'

export default class Workout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            starttime: null,
            endtime: null,
            workoutLifts: []
        }
        this.getWorkout = this.getWorkout.bind(this)
        this.getWorkoutLifts = this.getWorkoutLifts.bind(this)
    }

    getWorkout() {
        axios.get(`http://localhost:2000/api/workout/${this.props.match.params.id}`)
            .then(res => {
                var json = res.data
                if(json.success === true) {
                    this.setState(json.data)
                }
            })
    }

    getWorkoutLifts() {
        getAllByID('workoutLift', this.props.match.params.id)
            .then(res => {
                var json = res.data
                if(json.success === true) {
                    this.setState({workoutLifts: json.data})
                }
            })
    }

    componentDidMount() {
        this.getWorkout()
        this.getWorkoutLifts()
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
