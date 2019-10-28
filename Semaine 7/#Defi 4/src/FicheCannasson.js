import React from "react";
import { CannassonRun } from "./config";
import "bootstrap/dist/css/bootstrap.css";

const FicheCannasson = ({ id }) => {
  let nom,
    famille,
    categorie,
    sexe,
    level,
    nbreDeCourse,
    nbreDeVictoire,
    popularite,
    nbreEntrainement,
    nbreDopageAvere,
    attenteAvantProchaineCourse;
  async function loadCannassonData() {
    nom = await CannassonRun.methods.nomDuCannasson(id).call();
    famille = await CannassonRun.methods.fammileDuCannasson(id).call();
    categorie = await CannassonRun.methods.categoryDuCannasson(id).call();
    sexe = await CannassonRun.methods.sexeDuCannasson(id).call();
    level = await CannassonRun.methods.levelDuCannasson(id).call();
    nbreDeCourse = await CannassonRun.methods.nbreCourseDuCannasson(id).call();
    nbreDeVictoire = await CannassonRun.methods
      .nbreVictoireDuCannasson(id)
      .call();
    nbreEntrainement = await CannassonRun.methods
      .nbreEntrainementDuCannasson(id)
      .call();
    popularite = await CannassonRun.methods.populariteDuCannasson(id).call();
    nbreDopageAvere = await CannassonRun.methods
      .nbreDopageDuCannasson(id)
      .call();
    attenteAvantProchaineCourse = await CannassonRun.methods
      .tempsAttenteDuCannasson(id)
      .call();
  }
  loadCannassonData();

  return (
    <div className="row m-2">
      <div className="card" id="card">
        <h4 className="mt-3">{nom}</h4>
        <img
          src="http://www.photos-nature-passion.fr/images/photo-de-cheval-drole_4.jpg"
          alt="Cannasson"
          className="card-img-top"
        />
        <div className="card-body">
          <p className="card-text">
            {famille} {categorie}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Sexe : {sexe} </li>
          <li className="list-group-item">Level : {level} </li>
          <li className="list-group-item">
            Nombre de course(s) : {nbreDeCourse}
          </li>
          <li className="list-group-item">
            Nombre de Victoire(s) : {nbreDeVictoire}
          </li>
          <li className="list-group-item">
            Nombre d'entrainement : {nbreEntrainement}
          </li>
          <li className="list-group-item">Popularité : {popularite}</li>
          <li className="list-group-item">
            Nombre de dopage avéré : {nbreDopageAvere}
          </li>
        </ul>
        <div className="card-body">
          <button className="btn-primary">S'entrainer</button>
          <button className="btn-secondary">Faire une course</button>
        </div>
      </div>
    </div>
  );
};

export default FicheCannasson;
