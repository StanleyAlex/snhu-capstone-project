import {useState} from 'react';
import {Link} from "react-router-dom";
import {some, isEmpty, map} from 'lodash';
import * as EmailValidator from 'email-validator';
import WithLayout from "./WithLayout";

const inputFields = document.getElementsByTagName("input");
const textAreas = document.getElementsByTagName("textarea");

const resetRegisterForm = ({setRegisterDisabled}) => () => {
    map(inputFields, (field) => field.value = "");
    map(textAreas, (field) => field.value = "");
    document.getElementById("email-error").style.display = "none";
    document.getElementById("phone-error").style.display = "none";
    setRegisterDisabled(true);
};

const onFormChange = ({setRegisterDisabled}) => (e) => {

    let disableRegister = some(inputFields, (field) => isEmpty(field.value));

    if (e.target.id === "email") {
        if (!isEmpty(e.target.value)) {
            const emailValue = e.target.value;
            const emailValidation = EmailValidator.validate(emailValue);

            if (!emailValidation) {
                document.getElementById("email-error").style.display = "inline";
                disableRegister = true;
            } else {
                document.getElementById("email-error").style.display = "none";
            }
        } else {
            document.getElementById("email-error").style.display = "none";
        }
    }

    if (e.target.id === "phone") {
        if (!isEmpty(e.target.value)) {
            const phoneValue = e.target.value;
            if (phoneValue.length !== 10 || isNaN(phoneValue)) {
                document.getElementById("phone-error").style.display = "inline";
                return true;
            } else {
                document.getElementById("phone-error").style.display = "none";
            }
        } else {
            document.getElementById("phone-error").style.display = "none";
        }
    }

    setRegisterDisabled(disableRegister);
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
                  <div className="email-error" id="email-error">Invalid Email</div>
              </div>
              <label htmlFor="phone" className="col-sm-2 col-form-label">Phone <span className="required">*</span></label>
              <div className="col-sm-3">
                  <input type="text" className="form-control" id="phone"
                         aria-describedby="phone" placeholder="Enter Phone" maxLength={10} onChange={onFormChange({setRegisterDisabled})} />
                  <div className="phone-error" id="phone-error">Invalid Phone</div>
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-3">
                  <textarea className="form-control" id="address"
                            aria-describedby="address" placeholder="Enter Address (Optional)" onChange={onFormChange({setRegisterDisabled})} />
              </div>
          </div>
          <div className="row required-text col-sm-2">* Required Field</div>
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