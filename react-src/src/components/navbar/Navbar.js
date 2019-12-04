import React, { Component } from 'react'
import { Link } from'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
                    <Link className='navbar-brand' to='/'>Tracker</Link>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            {/* <li className='nav-item'>
                                <Link className='nav-link' to='/workout'>Workout</Link>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
