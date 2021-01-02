import React from "react";
import "./css/component.css";

const FRIMSFooter = () => (
    <div className="frims-footer container-fluid">
        <div className="frims-copyright col-sm-9">
            <span>Copyright &copy; 2020 FRIMS. All Rights Reserved.</span>
        </div>
        <div className="frims-social-media col-sm-3">
            <a className="btn btn-info" href="#!" role="button" title="Facebook"><i className="fab fa-facebook"></i></a>
            <a className="btn btn-info" href="#!" role="button" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a className="btn btn-info" href="#!" role="button" title="Twitter"><i className="fab fa-twitter"></i></a>
            <a className="btn btn-info" href="#!" role="button" title="Youtube"><i className="fab fa-youtube"></i></a>
        </div>
    </div>
);

export default FRIMSFooter;