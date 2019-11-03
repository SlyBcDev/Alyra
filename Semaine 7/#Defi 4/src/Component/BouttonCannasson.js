import React, { Component } from "react";
import { CannassonRun } from "../config";
import "bootstrap/dist/css/bootstrap.css";

class BouttonCannasson extends Component {
  UNSAFE_componentWillMount() {
    this.loadCannassonData();
  }

  loadCannassonData = async () => {
    let id = this.props.id;
    const nom = await CannassonRun.method.nomDuCannasson(id).call();
    const sexe = await CannassonRun.methods.sexeDuCannasson(id).call();
    const level = await CannassonRun.methods.levelDuCannsson(id).call();
    const popularite = await CannassonRun.methods
      .populariteDuCannasson(id)
      .call();
    this.setState({
      id,
      nom,
      sexe,
      level,
      popularite
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      nom: "",
      sexe: "",
      level: 0,
      popularite: 0
    };
  }

  CallBackReturn = () => {};

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
