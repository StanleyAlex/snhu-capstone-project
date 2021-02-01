import {useState} from 'react';
import WithLayout from "./WithLayout";
import UserLogin from "./UserLogin";
import {isEmpty} from "lodash";
import loginUserService from "../service/LoginService";
import incidentsListService from "../service/IncidentsListService";
import IncidentsList from "./IncidentsList";
import RecentIncidents from "./RecentIncidents";

const authenticateUser = ({ setLoading, setLoginError, setAuthenticated }) => () => {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    setLoading(true);
    loginUserService({ userName, password }).then(response => {
        setLoading(false);
        if (response.statusCode !== 200) {
            setLoginError(true);
            setAuthenticated(false);
        } else {
            localStorage.setItem("user", JSON.stringify(response.data.userDetails));

            setLoginError(false);
            setAuthenticated(true);
        }
    });

    return true;
};

const getIncidentsList = ({ setIncidentDetails, setIncidentDetailsError }) => {
    incidentsListService({locations: [], currentPage: 1, type: 'first' }).then(response => {
        if (response.statusCode === 200) {
            setIncidentDetails(response.data.incidentDetails);
            setIncidentDetailsError(undefined);
        } else {
            setIncidentDetailsError("Unable to fetch traffic incidents. Please try again later!");
        }
    });
}

const logoutUser = ({setAuthenticated}) => () => {
    localStorage.removeItem("user");
    setAuthenticated(false);
};

const resetError = ({setLoginError}) => () => {
  setLoginError(false);
};

const IncidentDashboard = () => {
    const storedUser = localStorage.getItem("user");
    const user = !isEmpty(storedUser) ? JSON.parse(storedUser) : {};
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(!isEmpty(storedUser));
    const [loginError, setLoginError] = useState(false);
    const [incidentDetails, setIncidentDetails] = useState({});
    const [incidentDetailsError, setIncidentDetailsError] = useState(undefined);
    const setters = { setLoading, setLoginError, setAuthenticated };
    authenticated && isEmpty(incidentDetails) && getIncidentsList({setIncidentDetails, setIncidentDetailsError});

    return (<div className="frims-dashboard container-fluid">
        <div className="row">
            <div className="dashboard col-sm-9">
                {!authenticated ? (<span className="dashboard-info-text"><h1>Please login to view Traffic Incidents!</h1></span>) : (<IncidentsList incidentDetails={incidentDetails} incidentDetailsError={incidentDetailsError} />)}
            </div>
            <div className="misc-details col-sm-3">
                <UserLogin loading={loading} authenticated={authenticated} loginError={loginError} user={user} authenticateUser={authenticateUser} logoutUser={logoutUser} resetError={resetError({setLoginError})} setters={setters} />
                <div className="recent-incidents">
                    {!authenticated ? (<span>Please login to view recent Incidents!</span>) : (<RecentIncidents />)}
                </div>
            </div>
        </div>
    </div>);
};

export default WithLayout(IncidentDashboard);