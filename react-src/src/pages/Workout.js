import React, { Component } from 'react'
import axios from 'axios'
import WorkoutTable from '../components/workout/WorkoutTable'

export default class Workout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            starttime: null,
            endtime: null
        }
        this.getWorkout = this.getWorkout.bind(this)
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

    componentDidMount() {
        this.getWorkout()
    }

    render() {
        const workout = (
            <tr>
                <td>{this.state.id}</td>
                <td>{this.state.starttime}</td>
                <td>{this.state.endtime}</td>
            </tr>
        )

        return (
            <div>
                <h1>Workout </h1>
                <WorkoutTable workouts={workout} />
            </div>
        )
    }
}
