import React from "react";
import { Spinner } from "react-bootstrap";

function DashboardLoader(props) {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default DashboardLoader;
