import React, { Component } from "react";
import { CannassonRun, web3 } from "../config";
import "bootstrap/dist/css/bootstrap.css";

class DispoPourGestation extends Component {
  UNSAFE_componentWillMount() {
    this.loadCannassonData();
    this.loadWalletData();
  }

  async loadWalletData() {
    let accounts = await web3.eth.getAccounts();
    let myAccount = accounts[0];
    this.setState({ myAccount });
  }

  async loadCannassonData() {
    let id = this.props.id;
    let nom = await CannassonRun.methods.nomDuCannasson(id).call();
    let famille = await CannassonRun.methods.fammileDuCannasson(id).call();
    let categorie = await CannassonRun.methods.categoryDuCannasson(id).call();
    let sexe = await CannassonRun.methods.sexeDuCannasson(id).call();
    let level = await CannassonRun.methods.levelDuCannasson(id).call();
    let nbreDeCourse = await CannassonRun.methods
      .nbreCourseDuCannasson(id)
      .call();
    let nbreDeVictoire = await CannassonRun.methods
      .nbreVictoireDuCannasson(id)
      .call();
    let nbreEntrainement = await CannassonRun.methods
      .nbreEntrainementDuCannasson(id)
      .call();
    let popularite = await CannassonRun.methods
      .populariteDuCannasson(id)
      .call();
    let nbreDopageAvere = await CannassonRun.methods
      .nbreDopageDuCannasson(id)
      .call();
    let proprio = await CannassonRun.methods.quiEstVendeur(id).call();
    let tarif = await CannassonRun.methods.tarifDemandePourGestation(id).call();

    this.setState({
      id: id,
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
      proprio,
      tarif
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      nom: "",
      famille: "",
      categorie: "",
      sexe: "",
      level: 1,
      nbreDeCourse: 0,
      nbreDeVictoire: 0,
      nbreEntrainement: 0,
      popularite: 0,
      nbreDopageAvere: 0,
      proprio: "",
      tarif: 0
    };
  }

  demanderGestation = async () => {
    let value = prompt("Combien proposez vous ? (Montant en Finney)");
    await CannassonRun.methods.proposerOffre(this.state.id).send(
      {
        from: this.state.myAccount,
        value: web3.utils.toWei(value, "finney")
      },
      function(error, transactionhash) {
        if (error) {
          alert(error);
        } else {
          alert(
            "Transaction envoyée : " +
              transactionhash +
              <br /> +
              "Pensez à rafrachir la page"
          );
        }
      }
    );
  };

  render() {
    return (
      <div>
        <div className="col-sm m-3">
          <div className="card bg-light">
            <h3 className="bg-primary">Dispo pour Gestation</h3>
            <div className="card-body">
              <div>
                <h5 className="card-title">{this.state.nom}</h5>
                <p className="card-text">
                  Famille : {this.state.famille} <br />
                  Categorie : {this.state.categorie} <br />
                  sexe : {this.state.sexe} <br />
                  level : {this.state.level} <br />
                  nombre de course : {this.state.nbreDeCourse} <br />
                  nombre de victoire : {this.state.nbreDeVictoire} <br />
                  nombre d'entrainement : {this.state.nbreEntrainement} <br />
                  popularité : {this.state.popularite} <br />
                  nombre de dopage avéré : {this.state.nbreDopageAvere} <br />
                </p>
                <h6>Prix demmandé: {this.state.tarif}Wei</h6>
                <button onClick={this.demanderGestation}>
                  Payer pour Gestation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DispoPourGestation;
