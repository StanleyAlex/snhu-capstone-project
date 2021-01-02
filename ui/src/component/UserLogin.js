import {useState} from 'react';
import {isEmpty} from 'lodash';
import {Link} from "react-router-dom";
import Loader from "./images/loader.gif";
import Avatar from "./images/avatar.png";

const resetLoginForm = ({setLoginDisabled, resetError}) => () => {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    setLoginDisabled(true);
    resetError();
};

const onFormChange = ({setLoginDisabled, setEntered}) => () => {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (!isEmpty(userName) && !isEmpty(password)) {
        setLoginDisabled(false);
    }
}

const UserLogin = (props) => {
    const { loading, authenticated, loginError, user, authenticateUser, logoutUser, resetError, setters: { setLoading, setLoginError, setAuthenticated } } = props;

    const [loginDisabled, setLoginDisabled] = useState(true);

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
                    <div className="forgot-username"><a href="#">Forgot Username?</a></div>
                </div>
                <div key="password" className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                           placeholder="Enter Password" onChange={onFormChange({setLoginDisabled})} />
                    <div className="forgot-password"><a href="#">Forgot Password?</a></div>
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
                        <div>
                            <h4 className="card-title">{user.first_name}</h4>
                            <p className="card-text">You are monitoring these locations - 12345, 67890</p>
                        </div>
                        <div className="user-button-bar">
                            <div>
                                <a href="#" className="btn btn-primary">Edit Preferences</a>
                            </div>
                            <div className="logout">
                                <a href="#" onClick={logoutUser({ setAuthenticated })}>LOGOUT</a>
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