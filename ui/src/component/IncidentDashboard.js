import {useState} from 'react';
import WithLayout from "./WithLayout";
import UserLogin from "./UserLogin";
import {isEmpty} from "lodash";
import loginUserService from "../service/LoginService";

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
            localStorage.setItem("user", JSON.stringify(response.data));
            setLoginError(false);
            setAuthenticated(true);
        }
    });

    return true;
};

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
    const setters = { setLoading, setLoginError, setAuthenticated };

    return (<div className="frims-dashboard container-fluid">
        <div className="row">
            <div className="dashboard col-sm-9">
                {!authenticated ? (<span className="dashboard-info-text"><h1>Please login to view Traffic Incidents!</h1></span>) : (<span className="dashboard-info-text"><h1>You'll see Incidents shortly!</h1></span>)}
            </div>
            <div className="misc-details col-sm-3">
                <UserLogin loading={loading} authenticated={authenticated} loginError={loginError} user={user} authenticateUser={authenticateUser} logoutUser={logoutUser} resetError={resetError({setLoginError})} setters={setters} />
                <div className="recent-incidents">
                    {!authenticated ? (<span>Please login to view recent Incidents!</span>) : (<span>You'll see recent Incidents shortly!</span>)}
                </div>
            </div>
        </div>
    </div>);
};

export default WithLayout(IncidentDashboard);