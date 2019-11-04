import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CoursePhoto from "../img/CoursePhoto.jpg";

class Course extends Component {
  render() {
    return (
      <div>
        <div className="m-5">
          <img src={CoursePhoto} alt="course" />
        </div>
      </div>
    );
  }
}

export default Course;
