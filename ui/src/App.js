import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './lib/bootstrap/css/bootstrap.min.css';
import './lib/fontawesome/css/all.min.css';
import './App.css';
import WithLayout from './component/WithLayout';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Link to="/dashboard">Go to Traffic Incidents Dashboard</Link>
            </div>
        );
    }
}

export default WithLayout(App);
