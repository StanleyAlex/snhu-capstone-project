import {useState} from 'react';
import WithLayout from "./WithLayout";
import {Link} from "react-router-dom";
import {isEmpty, some} from "lodash";

const resetPreferenceForm = ({setSaveDisabled}) => () => {
    document.getElementById("locations").value = "";
    setSaveDisabled(true);
};

const onFormChange = ({setSaveDisabled}) => () => {
    const locations = document.getElementById("locations").value;

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

const UserPreferences = () => {
    const [saveDisabled, setSaveDisabled] = useState(true);

    return (
        <div className="container-fluid">
            <div className="page-header mt-2">
                <h2>User Preferences</h2>
                <hr/>
            </div>
            <div className="form-group row">
                <label htmlFor="locations" className="col-sm-2 col-form-label">Locations <span className="required">*</span></label>
                <div className="col-sm-3">
                    <input type="text" className="form-control" id="locations"
                           aria-describedby="locations" placeholder="Enter 5-digit Zip Code(s) only" onChange={onFormChange({setSaveDisabled})} />
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
                                   value="yes" />
                                <label className="form-check-label" htmlFor="textRadiosYes">
                                    Yes
                                </label>
                        </div>
                        <div className="form-check radio-no">
                            <input className="form-check-input" type="radio" name="textRadios" id="textRadiosNo"
                                   value="no" checked />
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
                                   value="yes" />
                            <label className="form-check-label" htmlFor="emailRadiosYes">
                                Yes
                            </label>
                        </div>
                        <div className="col-sm-6 form-check radio-no">
                            <input className="form-check-input" type="radio" name="emailRadios" id="emailRadiosNo"
                                   value="no" checked />
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
                  <button id="preferenceReset" aria-label="Reset" title="Reset" type="button" className="btn btn-danger" onClick={resetPreferenceForm({setSaveDisabled})}>Reset</button>
                  <button id="preferenceSubmit" aria-label="Save" title="Save" type="button" className="btn btn-primary" disabled={saveDisabled}>Save</button>
              </span>
            </div>
        </div>);
};

export default WithLayout(UserPreferences);