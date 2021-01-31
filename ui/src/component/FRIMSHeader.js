import React from "react";
import "./css/component.css";
import headerLogo from "./images/frims-logo.png";

const FRIMSHeader = () => (
    <div className="frims-header container-fluid">
        <div className="frims-text col-sm-9">
            <h1><span className="bold-color">F</span>irst <span className="bold-color">R</span>esponders <span className="bold-color">I</span>nformation <span className="bold-color">M</span>anagement <span className="bold-color">S</span>ystem</h1>
        </div>
        <div className="frims-image col-sm-3">
            <img className="header-image" alt="First Responders Information Management System" src={headerLogo}/>
        </div>
    </div>
);

export default FRIMSHeader;