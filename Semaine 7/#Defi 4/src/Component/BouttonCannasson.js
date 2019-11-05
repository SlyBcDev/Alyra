import React, { Component } from "react";
import { CannassonRun } from "../config";
import "bootstrap/dist/css/bootstrap.css";

class BouttonCannasson extends Component {
  UNSAFE_componentWillMount() {
    this.loadCannassonData();
  }

  loadCannassonData = async () => {
    let id = this.props.id;
    const nom = await CannassonRun.methods.nomDuCannasson(id).call();
    const level = await CannassonRun.methods.levelDuCannasson(id).call();
    this.setState({
      id,
      nom,
      level
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      nom: "",
      level: 0
    };
  }

  CallBackReturn = () => {
    let parent2 = this.state.id;
    this.props.callBackGestation(parent2);
  };

  render() {
    return (
      <div>
        <button className="btn-info" onClick={this.CallBackReturn}>
          {this.state.nom} level:{this.state.level}
        </button>
      </div>
    );
  }
}

export default BouttonCannasson;
