import React, { Component } from 'react'
import { Link } from'react-router-dom'
import { getAll } from '../api/APIUtils'
import Table from '../components/common/Table'

export default class Workouts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workouts: [{
                id: 'None Found',
                starttime: 'None Found',
                endtime: 'None Found'
            }]
        }
        this.getAllWorkouts = this.getAllWorkouts.bind(this)
        this.openWorkout = this.openWorkout.bind(this)
    }

    getAllWorkouts() {
        getAll('workout').then(workouts => this.setState({workouts: workouts}))
    }

    openWorkout(id) {
        this.props.history.push(`/workout/${id}`)
    }
    
    componentDidMount() {
        this.getAllWorkouts()
    }

    render() {
        const headerColumns = ['ID', 'Start Time', 'End Time']
        const bodyRows = this.state.workouts.map(workout => (
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
                <Link to='/workout/0'><button type='button' className='btn btn-primary btn-lg'>New Workout</button></Link>
                <Table headerColumns={headerColumns} bodyRows={bodyRows} />
            </div>
        )
    }
}
