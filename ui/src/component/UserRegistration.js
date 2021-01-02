import {useState} from 'react';
import WithLayout from "./WithLayout";
import {Link} from "react-router-dom";
import {isEmpty} from "lodash";

const resetRegisterForm = ({setRegisterDisabled}) => () => {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    setRegisterDisabled(true);
};

const onFormChange = ({setRegisterDisabled}) => () => {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (!isEmpty(userName) && !isEmpty(password)) {
        setRegisterDisabled(false);
    }
}

const UserRegistration = () => {
    const [registerDisabled, setRegisterDisabled] = useState(true);

  return (
      <div className="container-fluid">
          <div className="page-header mt-2">
              <h2>User Registration</h2>
              <hr/>
          </div>
          <div className="form-group row">
              <label htmlFor="userName" className="col-sm-2 col-form-label">UserName <span className="required">*</span></label>
              <div className="col-sm-3">
                  <input type="text" className="form-control" id="userName"
                         aria-describedby="userName" placeholder="Enter UserName" onChange={onFormChange({setRegisterDisabled})} />
              </div>
              <label htmlFor="password" className="col-sm-2 col-form-label">Password <span className="required">*</span></label>
              <div className="col-sm-3">
                  <input type="password" className="form-control" id="password"
                         aria-describedby="password" placeholder="Enter Password" onChange={onFormChange({setRegisterDisabled})} />
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name <span className="required">*</span></label>
              <div className="col-sm-3">
                  <input type="text" className="form-control" id="firstName"
                         aria-describedby="firstName" placeholder="Enter First Name" onChange={onFormChange({setRegisterDisabled})} />
              </div>
              <label htmlFor="firstName" className="col-sm-2 col-form-label">Last Name <span className="required">*</span></label>
              <div className="col-sm-3">
                  <input type="text" className="form-control" id="lastName"
                         aria-describedby="lastName" placeholder="Enter Last Name" onChange={onFormChange({setRegisterDisabled})} />
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-3">
                  <input type="email" className="form-control" id="email"
                         aria-describedby="email" placeholder="Enter Email (Optional)" onChange={onFormChange({setRegisterDisabled})} />
              </div>
              <label htmlFor="phone" className="col-sm-2 col-form-label">Phone <span className="required">*</span></label>
              <div className="col-sm-3">
                  <input type="text" className="form-control" id="phone"
                         aria-describedby="phone" placeholder="Enter Phone" onChange={onFormChange({setRegisterDisabled})} />
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-3">
                  <textarea className="form-control" id="address"
                            aria-describedby="address" placeholder="Enter Address (Optional)" onChange={onFormChange({setRegisterDisabled})} />
              </div>
              <div className="required-text">* Required Field</div>
          </div>
          <div className="register-controls">
              <span className="back-dashboard">
                  <Link to="/dashboard"><i className="fa fa-backward"></i> Back To Dashboard</Link>
              </span>
              <span className="register-button-bar">
                  <button id="registerReset" aria-label="Reset" title="Reset" type="button" className="btn btn-danger" onClick={resetRegisterForm({setRegisterDisabled})}>Reset</button>
                  <button id="loginSubmit" aria-label="Register" title="Register" type="button" className="btn btn-primary" disabled={registerDisabled}>Register</button>
              </span>
          </div>
  </div>);
};

export default WithLayout(UserRegistration);