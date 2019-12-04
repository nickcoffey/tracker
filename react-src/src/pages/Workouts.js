import React, { Component } from 'react'
import { Link } from'react-router-dom'
import axios from 'axios'
import WorkoutTable from '../components/workout/WorkoutTable'

export default class Workouts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workouts: []
        }
        this.getAllWorkouts = this.getAllWorkouts.bind(this)
        this.openWorkout = this.openWorkout.bind(this)
    }

    getAllWorkouts() {
        const noneFound = {
            id: 'None Found',
            starttime: 'None Found',
            endtime: 'None Found'
        }

        axios.get('http://localhost:2000/api/workout/all')
            .then(res => {
                var json = res.data
                if(json.success === true) {
                    this.setState({workouts: json.data})
                } else {
                    this.setState({workouts: [noneFound]})
                }
            })
            .catch(err => {
                this.setState({workouts: [noneFound]})
            })
    }

    openWorkout(id) {
        this.props.history.push(`/workout/${id}`)
    }
    
    componentDidMount() {
        this.getAllWorkouts()
    }

    render() {
        const workouts = this.state.workouts.map(workout => (
            <tr onClick={() => this.openWorkout(workout.id)} key={workout.id}>
                <td>{workout.id}</td>
                <td>{workout.starttime}</td>
                <td>{workout.endtime}</td>
            </tr>
        ))
        
        return (
            <div>
                <h1>Workouts</h1>
                <hr />
                <WorkoutTable workouts={workouts} />
                <Link to='/newWorkout'><button type='button' className='btn btn-primary btn-lg'>New Workout</button></Link>
            </div>
        )
    }
}
