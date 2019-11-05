import React, { Component } from "react";
import { CannassonRun, web3 } from "../config";
import "bootstrap/dist/css/bootstrap.css";

class MesAttentes extends Component {
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

  demanderPaiement = async () => {
    await CannassonRun.methods
      .reclamerPaiement(this.state.id)
      .call({ from: this.state.myAccount });
  };

  render() {
    return (
      <div>
        {this.state.proprio === this.state.myAccount ? (
          <div className="col-sm m-3">
            <div className="card bg-light">
              {this.state.myAccount === this.state.meilleurOffrant ? (
                <h3 className="bg-danger"> Pas d'offre pour:</h3>
              ) : this.state.stringDate === "Enchère terminée" ? (
                <h3 className="bg-success"> Vente reussi pour : </h3>
              ) : (
                <h3 className="bg-warning"> J'ai une offre pour: </h3>
              )}

              <div className="card-body">
                <div>
                  <h4 className="card-title">{this.state.nom}</h4>
                  <p className="card-text">
                    Famille : {this.state.famille} <br />
                    Categorie : {this.state.categorie} <br />
                    sexe : {this.state.sexe} <br />
                    <strong>level : {this.state.level}</strong> <br />
                    popularité : {this.state.popularite} <br />
                  </p>
                  {this.state.myAccount === this.state.meilleurOffrant ? (
                    <div>
                      <h6 className="bg-secondary text-white">
                        Je demande {this.state.meilleurOffre} Finney
                      </h6>
                    </div>
                  ) : this.state.stringDate === "Enchère terminée" ? (
                    <button
                      className="btn-success"
                      onClick={this.demanderPaiement}
                    >
                      Réclamer le paiement
                    </button>
                  ) : (
                    <div>
                      <h6 className="bg-secondary text-white">
                        Meilleur Offre: {this.state.meilleurOffre} Finney
                      </h6>
                      <h6 className="bg-secondary text-white">
                        Par: {this.state.meilleurOffrant}
                      </h6>
                    </div>
                  )}

                  <p>
                    Fin de la vente dans:
                    <br />
                    {this.state.stringDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default MesAttentes;
