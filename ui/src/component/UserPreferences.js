import { useState, useEffect } from 'react';
import WithLayout from "./WithLayout";
import {Link} from "react-router-dom";
import {isEmpty, some} from "lodash";
import { getUserPreferences, saveUserPreferences } from "../service/UserPreferencesService";

const resetPreferenceForm = ({userId, setLocations, setSendText, setSendEmail, setSaveDisabled, setSaveError, setSaveSuccess}) => () => {
    getUserPreferences({userId}).then((response) => {
        setLocations(response.data.locations);
        setSendText(response.data.send_text === 1);
        setSendEmail(response.data.send_email === 1);
        setSaveDisabled(true);
        setSaveError(false);
        setSaveSuccess(false);
        document.getElementById("loc-error").style.display = "none";
    });
};

const onFormChange = ({setSaveDisabled, setLocations}) => () => {
    const locations = document.getElementById("locations").value;
    setLocations(locations);

    if (!isEmpty(locations)) {
        const zipValues = locations.split(",");
        const disableSave = some(zipValues, (zipValue) => isNaN(zipValue) || isEmpty(zipValue) || zipValue.length !== 5);
        setSaveDisabled(disableSave);
        if (disableSave) {
            document.getElementById("loc-error").style.display = "inline";
        } else {
            document.getElementById("loc-error").style.display = "none";
        }
    } else {
        document.getElementById("loc-error").style.display = "none";
    }
}

const selectTextRadio = ({ savedValue, sendText, setSendText, setSaveDisabled }) => () => {
    setSendText(sendText);
    setSaveDisabled(false);
}

const selectEmailRadio = ({ savedValue, sendEmail, setSendEmail, setSaveDisabled }) => () => {
    setSendEmail(sendEmail);
    setSaveDisabled(false);
}

const savePreferences = ({ userId, sendText, sendEmail, setSaveDisabled, setSaveError, setErrorMessage, setSaveSuccess }) => () => {
    const locations = document.getElementById("locations").value;
    const userPreferences = { locations, sendText, sendEmail };

    saveUserPreferences({ userId, userPreferences }).then((response) => {
        if (response.statusCode !== 200) {
            setSaveError(true);
            setSaveSuccess(false);
            setErrorMessage("Unable to save User Preferences. Please try again!");
        } else {
            setSaveError(false);
            setSaveSuccess(true);
            setSaveDisabled(true);
        }
    })
}

const UserPreferences = () => {
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [locations, setLocations] = useState("");
    const [sendText, setSendText] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    useEffect(() => {
        getUserPreferences({userId}).then((response) => {
            setLocations(response.data.locations);
            setSendText(response.data.send_text === 1);
            setSendEmail(response.data.send_email === 1);
        });
    }, []);

    return (
        <div className="container-fluid">
            <div className="page-header mt-2">
                <h2>User Preferences</h2>
                <hr/>
            </div>
            {saveError && (<div className="alert alert-danger">
                <strong>Update Error</strong> {errorMessage}
            </div>)}
            {saveSuccess && (<div className="alert alert-success">
                <strong>Update Successful</strong> User Preferences have been saved successfully!
            </div>)}
            <div className="form-group row">
                <label htmlFor="locations" className="col-sm-2 col-form-label">Locations <span className="required">*</span></label>
                <div className="col-sm-3">
                    <input type="text" className="form-control" id="locations"
                           aria-describedby="locations" placeholder="Enter 5-digit Zip Code(s) only" onChange={onFormChange({setSaveDisabled, setLocations})} value={locations} />
                    <label className="loc-error" id="loc-error">Invalid Entry</label>
                    <label className="loc-info-text">Comma-separated list of zip codes</label>
                </div>
            </div>
            <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Send Text? <span className="required">*</span></legend>
                    <div className="col-sm-10 radio-options">
                        <div className="col-sm-1 form-check radio-yes">
                            <input className="form-check-input" type="radio" name="textRadios" id="textRadiosYes"
                                   value="yes" checked={sendText === true} onChange={selectTextRadio({savedValue: sendText, sendText: true, setSendText, setSaveDisabled})} />
                                <label className="form-check-label" htmlFor="textRadiosYes">
                                    Yes
                                </label>
                        </div>
                        <div className="form-check radio-no">
                            <input className="form-check-input" type="radio" name="textRadios" id="textRadiosNo"
                                   value="no" checked={sendText === false} onChange={selectTextRadio({savedValue: sendText, sendText: false, setSendText, setSaveDisabled})} />
                                <label className="form-check-label" htmlFor="textRadiosNo">
                                    No
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Send Email? <span className="required">*</span></legend>
                    <div className="col-sm-10 radio-options">
                        <div className="col-sm-1 form-check radio-yes">
                            <input className="form-check-input" type="radio" name="emailRadios" id="emailRadiosYes"
                                   value="yes" checked={sendEmail === true} onChange={selectEmailRadio({savedValue: sendText, sendEmail: true, setSendEmail, setSaveDisabled})} />
                            <label className="form-check-label" htmlFor="emailRadiosYes">
                                Yes
                            </label>
                        </div>
                        <div className="col-sm-6 form-check radio-no">
                            <input className="form-check-input" type="radio" name="emailRadios" id="emailRadiosNo"
                                   value="no" checked={sendEmail === false} onChange={selectEmailRadio({savedValue: sendText, sendEmail: false, setSendEmail, setSaveDisabled})} />
                            <label className="form-check-label" htmlFor="emailRadiosNo">
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className="row">
                <label className="required-text col-sm-2">* Required Field</label>
            </div>
            <div className="preference-controls">
              <span className="back-dashboard">
                  <Link to="/dashboard"><i className="fa fa-backward"></i> Back To Dashboard</Link>
              </span>
                <span className="preference-button-bar">
                  <button id="preferenceReset" aria-label="Reset" title="Reset" type="button" className="btn btn-danger" onClick={resetPreferenceForm({userId, setLocations, setSendText, setSendEmail, setSaveDisabled, setSaveError, setSaveSuccess})}>Reset</button>
                  <button id="preferenceSubmit" aria-label="Save" title="Save" type="button" className="btn btn-primary" disabled={saveDisabled} onClick={savePreferences({userId, sendEmail, sendText, setSaveDisabled, setSaveError, setErrorMessage, setSaveSuccess})} >Save</button>
              </span>
            </div>
        </div>);
};

export default WithLayout(UserPreferences);