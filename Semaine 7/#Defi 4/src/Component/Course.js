import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";

class Course extends Component {
  render() {
    return (
      <div>
        <div className="m-3">
          <div className="py-1">
            <ProgressBar striped variant="danger" animated now={100} />
          </div>
          <div className="py-1">
            <ProgressBar striped variant="success" animated now={40} />
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
