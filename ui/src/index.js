import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {Router, Route} from 'react-router';
import './index.css';
import App from './App';
import IncidentDashboard from "./component/IncidentDashboard";
import UserRegistration from "./component/UserRegistration";
import UserPreferences from "./component/UserPreferences";

let history = createBrowserHistory();

ReactDOM.render(
    <Router history={history} >
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={IncidentDashboard} />
        <Route path="/registration" component={UserRegistration} />
        <Route path="/preferences" component={UserPreferences} />
    </Router>,
    document.getElementById('root')
);