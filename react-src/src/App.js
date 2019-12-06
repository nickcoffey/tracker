import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Workouts from './pages/Workouts'
import Workout from './pages/Workout'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='container' style={containerStyle}>
          <Route exact path='/' component={Workouts} />
          <Route path='/workout/:id' component={Workout} />
        </div>
      </div>
    </Router>
  )
}

const containerStyle = {
  marginTop: '5vh' 
}

export default App;
