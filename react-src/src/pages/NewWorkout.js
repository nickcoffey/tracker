import React, { Component } from 'react'
import axios from 'axios'
import WorkoutTable from '../components/workout/WorkoutTable'
import WorkoutForm from '../components/workout/WorkoutForm'
import WorkoutLiftTable from '../components/workoutlift/WorkoutLiftTable'

export default class NewWorkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            starttime: null,
            endtime: null
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
            id: null,
            starttime:  this.getCurrentDateString(),
            endtime: null
        }
        axios.post('http://localhost:2000/api/workout', newWorkout)
            .then(res => {
                const json = res.data
                this.setState({
                    id: json.data.id,
                    starttime: json.data.starttime,
                    endtime: json.data.endtime
                })
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

        return (
            <div>
                <h1>New Workout</h1>
                <button type='button' className='btn btn-primary btn-lg' onClick={this.startWorkout}>Start Workout</button>
                <WorkoutTable workouts={workout} />
                <h3>Lifts</h3>
                <WorkoutLiftTable workoutID={this.state.id} />
                {/* <WorkoutForm /> */}
            </div>
        )
    }
}
