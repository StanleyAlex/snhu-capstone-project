import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import './lib/bootstrap/css/bootstrap.min.css';
import './App.css';

import loginUser from "./service/LoginService";

class App extends Component {
    state = {
        currentUser: {}
    };

    resetPage = () => this.setState({currentUser: {}});

    loginUser = (e) => {
        loginUser({userName: "salex", password: "p@ssw0rd"}).then(response => this.setState({currentUser: {...response}}));
    };

    render() {
        const { currentUser } = this.state;

        if (isEmpty(currentUser)) {
            return (
                <div className="App">
                    <header className="App-header">
                        <div className="info-text">
                            <p className="info-text-header">First Responders Information Management System</p>
                            <p className="info-text-header">[ FRIMS ]</p>
                            <p className="info-text-msg">Please click the button below to get current User details!</p>
                        </div>
                        <div className="button-toolbar">
                            <button type="button" className="btn btn-primary" onClick={this.loginUser}>GET USER</button>
                        </div>
                    </header>
                </div>
            );
        }

        return (
            <div className="App">
                <header className="App-header">
                    <div className="table-striped">
                        <table className="table">
                            <thead className="table-header-row">
                                <tr className="header-row">
                                    <th className="header-fname d-lg-table-cell text-left">
                                        First Name
                                    </th>
                                    <th className="header-lname d-lg-table-cell text-left">
                                        Last Name
                                    </th>
                                    <th className="header-email d-lg-table-cell text-left">
                                        Email
                                    </th>
                                    <th className="header-phone d-lg-table-cell text-left">
                                        Phone
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="data-row">
                                <tr className="data-row">
                                    <td className="cell-fname d-lg-table-cell text-left">
                                        {currentUser.first_name}
                                    </td>
                                    <td className="cell-lname d-lg-table-cell text-left">
                                        {currentUser.last_name}
                                    </td>
                                    <td className="cell-email d-lg-table-cell text-left">
                                        {currentUser.email}
                                    </td>
                                    <td className="cell-phone d-lg-table-cell text-left">
                                        {currentUser.phone}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="button-toolbar">
                        <button type="button" className="btn btn-danger mr-2" onClick={this.resetPage}>RESET</button>
                        <button type="button" className="btn btn-primary" onClick={this.loginUser}>REFRESH</button>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
