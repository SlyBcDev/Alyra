import React, { Component } from "react";
import { CannassonRun } from "./config";
import "bootstrap/dist/css/bootstrap.css";

class FicheCannasson extends Component {
  UNSAFE_componentWillMount() {
    this.loadCannassonData();
  }

  async loadCannassonData(i) {
    const nom = await CannassonRun.methods.nomDuCannasson(i).call();
    const famille = await CannassonRun.methods.fammileDuCannasson(i).call();
    const categorie = await CannassonRun.methods.categoryDuCannasson(i).call();
    const sexe = await CannassonRun.methods.sexeDuCannasson(i).call();
    const level = await CannassonRun.methods.levelDuCannasson(i).call();
    const nbreDeCourse = await CannassonRun.methods
      .nbreCourseDuCannasson(i)
      .call();
    const nbreDeVictoire = await CannassonRun.methods
      .nbreVictoireDuCannasson(i)
      .call();
    const nbreEntrainement = await CannassonRun.methods
      .nbreEntrainementDuCannasson(i)
      .call();
    const popularite = await CannassonRun.methods
      .populariteDuCannasson(i)
      .call();
    const nbreDopageAvere = await CannassonRun.methods
      .nbreDopageDuCannasson(i)
      .call();
    const attenteAvantProchaineCourse = await CannassonRun.methods
      .tempsAttenteDuCannasson(i)
      .call();
    this.setState({
      nom,
      famille,
      categorie,
      sexe,
      level,
      nbreDeCourse,
      nbreDeVictoire,
      nbreEntrainement,
      popularite,
      nbreDopageAvere,
      attenteAvantProchaineCourse
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      famille: "",
      categorie: "",
      sexe: "",
      level: 0,
      nbreDeCourse: 0,
      nbreDeVictoire: 0,
      nbreEntrainement: 0,
      popularite: 0,
      nbreDopageAvere: 0,
      attenteAvantProchaineCourse: 0
    };
  }

  render() {
    return (
      <div className="row m-2">
        <div className="card" id="card">
          <h4 className="mt-3">{this.state.nom}</h4>
          <img
            src="http://www.photos-nature-passion.fr/images/photo-de-cheval-drole_4.jpg"
            alt="Cannasson"
            className="card-img-top"
          />
          <div className="card-body">
            <p className="card-text">
              {this.state.famille} {this.state.categorie}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Sexe : {this.state.sexe} </li>
            <li className="list-group-item">Level : {this.state.level} </li>
            <li className="list-group-item">
              Nombre de course(s) : {this.state.nbreDeCourse}
            </li>
            <li className="list-group-item">
              Nombre de Victoire(s) : {this.state.nbreDeVictoire}
            </li>
            <li className="list-group-item">
              Nombre d'entrainement : {this.state.nbreEntrainement}
            </li>
            <li className="list-group-item">
              Popularité : {this.state.popularite}
            </li>
            <li className="list-group-item">
              Nombre de dopage avéré : {this.state.nbreDopageAvere}
            </li>
          </ul>
          <div className="card-body">
            <button className="btn-primary">S'entrainer</button>
            <button className="btn-secondary">Faire une course</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FicheCannasson;
