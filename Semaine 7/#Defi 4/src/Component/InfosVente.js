import React, { Component } from "react";
import { CannassonRun, web3 } from "../config";
import "bootstrap/dist/css/bootstrap.css";

class InfosVente extends Component {
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

    let meilleurOffre = web3.utils.fromWei(
      await CannassonRun.methods.tarifEnchere(id).call(),
      "finney"
    );
    let finEnchere = await CannassonRun.methods.finEnchere(id).call();

    let enchereHollandaise = await CannassonRun.methods
      .enchereHollandaise(id)
      .call();

    let enchereId = await CannassonRun.methods.obtenirEnchereId(id).call();
    let meilleurOffrant = await CannassonRun.methods.meilleurOffrant(id).call();

    let now = Math.round(new Date().getTime() / 1000);
    let timestamp = finEnchere;
    let delai = timestamp - now;
    let jour = Math.floor(delai / 86400);
    let heure = Math.floor((delai % 86400) / 3600);
    let min = Math.floor(((delai % 86400) % 3600) / 60);
    let stringDate;
    if (jour <= 0 && heure <= 0 && min <= 0) {
      stringDate = "Enchère terminée";
    } else {
      stringDate = `${jour}Jour(s),${heure}H ${min}min `;
    }

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
      meilleurOffre,
      finEnchere,
      enchereHollandaise,
      proprio,
      stringDate,
      enchereId,
      meilleurOffrant
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
      meilleurOffre: 0,
      finEnchere: 0,
      enchereHollandaise: false,
      proprio: "",
      stringDate: "",
      enchereId: 0,
      meilleurOffrant: ""
    };
  }

  faireUneOffre = async () => {
    let value = prompt("Combien proposez vous ? (Montant en Finney)");
    await CannassonRun.methods.proposerOffre(this.state.enchereId).send(
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

  faireUneOffreHollandaise = async () => {
    let value = this.state.meilleurOffre;
    let enchereId = parseInt(this.state.enchereId);
    await CannassonRun.methods.proposerOffreHollandaise(enchereId).send(
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

  reclamerCannasson = async () => {
    await CannassonRun.methods
      .recupererCannasson(this.state.id)
      .send({ from: this.state.myAccount }, () => {
        this.props.CallBackLoading();
        CannassonRun.events.allEvents(
          {
            fromBlock: this.state.blockNumber
          },
          err => {
            if (!err) {
              alert(`${this.state.nom} rejoint votre écurie ! `);
              this.props.CallBackLoading();
              window.location.reload();
            }
          }
        );
      });
  };

  render() {
    return (
      <div>
        {this.state.proprio === this.state.myAccount ? (
          <div />
        ) : (
          <div className="col-sm m-3">
            <div className="card bg-light">
              {this.state.myAccount === this.state.meilleurOffrant ? (
                <h3 className="bg-success"> J'ai enchéri sur: </h3>
              ) : this.state.enchereHollandaise ? (
                <h3 className="bg-warning">Enchère Hollandaise</h3>
              ) : (
                <h3 className="bg-info"> Enchère classique </h3>
              )}

              <div className="card-body">
                <div>
                  <h4 className="card-title">{this.state.nom}</h4>
                  <p className="card-text">
                    Famille : {this.state.famille} <br />
                    Categorie : {this.state.categorie} <br />
                    sexe : {this.state.sexe} <br />
                    <strong>level : {this.state.level}</strong> <br />
                    nombre de course : {this.state.nbreDeCourse} <br />
                    nombre de victoire : {this.state.nbreDeVictoire} <br />
                    nombre d'entrainement : {this.state.nbreEntrainement} <br />
                    popularité : {this.state.popularite} <br />
                    nombre de dopage avéré : {this.state.nbreDopageAvere} <br />
                  </p>

                  {this.state.myAccount === this.state.meilleurOffrant ? (
                    <h6 className="bg-warning">
                      Mon Offre: {this.state.meilleurOffre}
                    </h6>
                  ) : this.state.enchereHollandaise ? (
                    <h6 className="bg-secondary text-white">
                      Prix demandé: {this.state.meilleurOffre} Finney
                    </h6>
                  ) : (
                    <h6 className="bg-secondary text-white">
                      Prix de départ: {this.state.meilleurOffre} Finney
                    </h6>
                  )}

                  {this.state.enchereHollandaise ? (
                    <button
                      className="btn btn-primary"
                      onClick={this.faireUneOffreHollandaise}
                    >
                      Acheter
                    </button>
                  ) : this.state.meilleurOffrant === this.state.myAccount ? (
                    <div />
                  ) : this.state.meilleurOffrant === this.state.myAccount &&
                    this.state.stringDate === "Enchère terminée" ? (
                    <button
                      className="btn btn-success"
                      onClick={this.reclamerCannasson}
                    >
                      Réclamer mon nouveau Cannasson
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={this.faireUneOffre}
                    >
                      Faire une offre
                    </button>
                  )}

                  <p>
                    Fin de l'offre dans:
                    <br />
                    {this.state.stringDate}
                  </p>
                  <h6>Propriétaire:</h6>
                  <p>{this.state.proprio}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default InfosVente;
