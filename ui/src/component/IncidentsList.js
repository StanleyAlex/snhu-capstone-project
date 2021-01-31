import React, {useState} from "react";
import {orderBy, isEmpty} from "lodash";
import "./css/component.css";
import incidentsListService from "../service/IncidentsListService";

const gotToPage = ({ setComponentIncidentDetails, setComponentIncidentDetailsError, currentPage, type, pages }) => () => {
    incidentsListService({locations: [], currentPage, type, pages }).then(response => {
        if (response.statusCode === 200) {
            setComponentIncidentDetails(response.data.incidentDetails);
            setComponentIncidentDetailsError(undefined);
        } else {
            setComponentIncidentDetailsError("Unable to fetch traffic incidents. Please try again later!");
        }
    });
};

const IncidentsList = (props) => {
    const [componentIncidentDetails, setComponentIncidentDetails] = useState({});
    const [componentIncidentDetailsError, setComponentIncidentDetailsError] = useState("");

    const incidentDetails = !isEmpty(componentIncidentDetails) ? componentIncidentDetails : props.incidentDetails;
    const incidentDetailsError = !isEmpty(componentIncidentDetailsError) ? componentIncidentDetailsError : props.incidentDetailsError;
    const { pages = [], currentPage, totalCount, pageLimit } = incidentDetails;
    const incidents = orderBy(incidentDetails.incidents || [], ["traffic_report_status"], ["asc"]);
    const firstPreviousClassName = currentPage === 1 ? "page-item disabled" : "page-item";
    const nextLastClassName = currentPage === Math.ceil(totalCount/pageLimit) ? "page-item disabled" : "page-item";
    let rowCtr = (currentPage - 1) * pageLimit;

    if (incidentDetailsError) {
        return (
            <div className="incidents-list container-fluid">
                <div className="incidents-list-title col-sm-9">
                    <h1><span className="bold-color">Traffic Incidents</span></h1>
                </div>
                <div className="incidents-list-error col-sm-12">
                    {incidentDetailsError}
                </div>
            </div>
        );
    }

    return (
        <div className="incidents-list container-fluid">
            <div className="incidents-list-title col-sm-9">
                <h1><span className="bold-color">Traffic Incidents</span></h1>
            </div>
            <div className="page-navigation">
                <div className="page-count">
                    <span>Showing {rowCtr+1}-{rowCtr+incidents.length} of {totalCount}</span>
                </div>
                <div className="page-numbers">
                    <nav aria-label="Page Navigation">
                        <ul className="pagination">
                            <li className={firstPreviousClassName}><a className="page-link" onClick={gotToPage({setComponentIncidentDetails, setComponentIncidentDetailsError, currentPage: 1, type: 'first'})}>&lt;&lt;</a></li>
                            <li className={firstPreviousClassName}><a className="page-link" onClick={gotToPage({setComponentIncidentDetails, setComponentIncidentDetailsError, currentPage: (currentPage - 1), type: 'previous'})}>&lt;</a></li>
                            {pages.map((page) => {
                                const className = page === currentPage ? "page-item active" : "page-item";
                                return (<li className={className} key={page}><a className="page-link" onClick={gotToPage({setComponentIncidentDetails, setComponentIncidentDetailsError, currentPage: page, type: 'page', pages})}>{page}</a></li>)
                            })}
                            <li className={nextLastClassName}><a className="page-link" onClick={gotToPage({setComponentIncidentDetails, setComponentIncidentDetailsError, currentPage: (currentPage + 1), type: 'next'})}>&gt;</a></li>
                            <li className={nextLastClassName}><a className="page-link" onClick={gotToPage({setComponentIncidentDetails, setComponentIncidentDetailsError, currentPage: Math.ceil(totalCount/pageLimit), type: 'last'})}>&gt;&gt;</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="incidents-list-table col-sm-12">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">TYPE</th>
                            <th scope="col">REPORT DATE & TIME</th>
                            <th scope="col">LOCATION</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="incident-body">
                        {incidents.length > 0 && incidents.map((incident) => {
                            const counter = ++rowCtr;
                            return (
                                <tr key={"row_"+counter} className={incident.traffic_report_status}>
                                    <th key={counter} scope="row">{counter}</th>
                                    <td key={incident.traffic_report_id.split('_')[1]}>{incident.traffic_report_id.split('_')[1]}</td>
                                    <td key={incident.issue_reported}>{incident.issue_reported}</td>
                                    <td key={incident.traffic_report_status_date_time}>{incident.traffic_report_status_date_time}</td>
                                    <td key={incident.location}>{incident.location}</td>
                                    <td key={incident.address}>{incident.address}</td>
                                    <td key={incident.traffic_report_status}>{incident.traffic_report_status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IncidentsList;