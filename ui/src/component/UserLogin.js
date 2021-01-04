import {useState, useEffect} from 'react';
import {isEmpty} from 'lodash';
import {Link} from "react-router-dom";
import Loader from "./images/loader.gif";
import Avatar from "./images/avatar.png";
import {getUserPreferences} from "../service/UserPreferencesService";

const resetLoginForm = ({setLoginDisabled, resetError}) => () => {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    setLoginDisabled(true);
    resetError();
};

const onFormChange = ({setLoginDisabled}) => () => {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (!isEmpty(userName) && !isEmpty(password)) {
        setLoginDisabled(false);
    }
}

const goToUserPreferences = ({ userId }) => () => {
    window.location.replace("/preferences?userId="+userId);
}

const UserLogin = (props) => {
    const { loading, authenticated, loginError, user, authenticateUser, logoutUser, resetError, setters: { setLoading, setLoginError, setAuthenticated } } = props;

    const [loginDisabled, setLoginDisabled] = useState(true);
    const [locations, setLocations] = useState("");

    useEffect(() => {
        getUserPreferences({userId: user.user_id}).then((response) => {
            setLocations(response.data.locations);
        });
    });

    return (<div className="user-login">
        {!loading ? [(!authenticated ? (<div><h3 className="login-title"><span className="badge bg-white">Login</span></h3>
            {loginError && (<div className="alert alert-danger">
                <strong>Login Error!</strong> Incorrect Credentials. Please try again!
            </div>)}
            <form>
                <div key="userName" className="form-group">
                    <label htmlFor="userName">UserName</label>
                    <input type="text" className="form-control" id="userName"
                           aria-describedby="emailHelp" placeholder="Enter UserName" onChange={onFormChange({setLoginDisabled})} />
                    <div className="forgot-username"><a href="#" title="Forgot UserName?">Forgot UserName?</a></div>
                </div>
                <div key="password" className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                           placeholder="Enter Password" onChange={onFormChange({setLoginDisabled})} />
                    <div className="forgot-password"><a href="#" title="Forgot Password?">Forgot Password?</a></div>
                </div>
                <div key="buttons" className="button-bar">
                    <button id="loginReset" aria-label="Reset" title="Reset" type="button" className="btn btn-danger" onClick={resetLoginForm({setLoginDisabled, resetError})}>Reset</button>
                    <button id="loginSubmit" aria-label="Login" title="Login" type="button" className="btn btn-primary" onClick={authenticateUser({ setLoading, setLoginError, setAuthenticated })} disabled={loginDisabled}>Login</button>
                </div>
                <div key="registration" className="new-user">
                    <Link to="/registration">New User?</Link>
                </div>
            </form></div>) :
            (<div className="card">
                <img className="card-img-top" height="250px" src={Avatar} alt={user.first_name}/>
                <div className="card-body">
                    <div className="user-title">
                        <span><h4 className="card-title">{user.first_name}</h4></span>
                        <span className="logout"><a href="#" title="Logout" onClick={logoutUser({ setAuthenticated })}>LOGOUT</a></span>
                    </div>
                    <div className="user-content">
                        <p className="card-text">You are monitoring these locations - {locations}</p>
                        <div className="user-button-bar">
                            <a href="#" title="Edit Preferences" className="btn btn-primary" onClick={goToUserPreferences({ userId: user.user_id })}>Edit Preferences</a>
                        </div>
                    </div>
                </div>
            </div>))] : (
            <div className="loader">
                <span className="sr-only">Authenticating User...</span>
                Authenticating User
                <img className="loader-image" alt="Authenticating User..." src={Loader}/>
            </div>)}
    </div>);
}

export default UserLogin;