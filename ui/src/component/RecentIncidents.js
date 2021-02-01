import React, { useState } from "react";
import { isEmpty } from "lodash";
import moment from "moment";
import "./css/component.css";
import recentIncidentsService from "../service/RecentIncidentsService";

const getRecentIncidents = ({ setRecentIncidents, setRecentIncidentsError }) => {
    console.log("getRecentIncidents CALLED!");
    recentIncidentsService().then(response => {
        if (response.statusCode === 200) {
            setRecentIncidents(response.data.recentIncidents);
            setRecentIncidentsError(undefined);
        } else {
            setRecentIncidentsError("Unable to fetch traffic incidents. Please try again later!");
        }
    });
};

const RecentIncidents = () => {
    const [recentIncidents, setRecentIncidents] = useState([]);
    const [recentIncidentsError, setRecentIncidentsError] = useState("");

    console.log("RECENT --> ", recentIncidents);
    isEmpty(recentIncidents) && getRecentIncidents({ setRecentIncidents, setRecentIncidentsError });

    if (!isEmpty(recentIncidentsError)) {
        return (
            <div className="recent-incidents container-fluid">
                <div className="recent-incidents-error col-sm-12">
                    {recentIncidentsError}
                </div>
            </div>
        );
    }

    return (
        <div className="recent-incidents container-fluid">
            <div className="recent-incidents-title">
                <span className="bold-color">Recent Incidents</span>
            </div>
            <div className="recent-incidents-list">
                <ul>
                    {recentIncidents.map((incident) => (<li className="recent-incident">
                            <span className="recent-incident-name">{incident.issue_reported}</span>
                            <ul className="recent-incident-details">
                                <li key={incident.traffic_report_id.split('_')[1]}>ID: {incident.traffic_report_id.split('_')[1]}</li>
                                <li key={incident.address}>ADDRESS: {incident.address}</li>
                                <li key={incident.traffic_report_status_date_time}>TIME: {moment(incident.traffic_report_status_date_time).format("MMMM Do YYYY, h:mm a")}</li>
                            </ul>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    );
};

export default RecentIncidents;