import React, { Component } from "react";
import { CannassonRun, web3 } from "../config";
import "bootstrap/dist/css/bootstrap.css";
import Attente from "./Attente";
import Cannasson001 from "../img/Cannasson001.jpg";

class FicheCannasson extends Component {
  UNSAFE_componentWillMount() {
    this.loadCannassonData();
    this.loadWalletData();
  }

  async loadWalletData() {
    let accounts = await web3.eth.getAccounts();
    let myAccount = accounts[0];
    let blockNumber = await web3.eth.getBlockNumber();

    this.setState({ proprio: myAccount, blockNumber });
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
    let attenteAvantProchaineCourse = await CannassonRun.methods
      .tempsAttenteDuCannasson(id)
      .call();
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
      attenteAvantProchaineCourse
    });
  }

  changeName = async () => {
    let newName = prompt(
      "Quel nom voulez vous donner à votre Cheval ?" +
        "(Cette fonction vous coutera 1 Finney(0.001 Ether))"
    );

    await CannassonRun.methods.changerDeNom(this.state.id, newName).send(
      {
        from: this.state.proprio,
        value: web3.utils.toWei("1", "finney")
      },
      function(error, transactionhash) {
        if (error) {
          alert(error);
        } else {
          alert(
            "Opération reussi : " +
              transactionhash +
              <br /> +
              "Le nouveau nom de votre cheval est " +
              newName
          );
        }
      }
    );
  };

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
      attenteAvantProchaineCourse: 0,
      proprio: "",
      isShow: true,
      enchereValue: 0,
      checkbox: false,
      concurrent: 0,
      winner: 0,
      loading: false,
      blockNumber: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sEntrainer = async () => {
    let value = prompt(
      "Combien souhaitez vous investir pour l'entrainement ? De 1,2 ou 3 Finney? (Le level gagné est dépendant de la somme.)"
    );

    await CannassonRun.methods.entrainerCannasson(this.state.id).send(
      {
        from: this.state.proprio,
        value: web3.utils.toWei(value, "finney")
      },
      () => {
        this.props.CallBackLoading();
        CannassonRun.events.allEvents(
          {
            fromBlock: this.state.blockNumber
          },
          (err, event) => {
            if (!err) {
              let levelUp = parseInt(event.returnValues[0]);

              alert(`FELICITATION !!! \n
              Votre Cannasson a gagné ${levelUp} point(s)!
              `);
              this.props.CallBackLoading();
              window.location.reload();
            }
          }
        );
      }
    );
  };

  doper = async () => {
    let value = prompt(
      "Combien souhaitez vous investir dans le dopage ? Attention !!! Pendant 24h votre cheval est susceptible d'être controlé positif, il serait suspendu pendant une pèriode et perdrait toute sa popularité!!! De 5,10 ou 30 Finney? (Le level gagné est dépendant de la somme.)"
    );

    await CannassonRun.methods.doperCannasson(this.state.id).send(
      {
        from: this.state.proprio,
        value: web3.utils.toWei(value, "finney")
      },
      () => {
        this.props.CallBackLoading();
        CannassonRun.events.allEvents(
          {
            fromBlock: this.state.blockNumber
          },
          (err, event) => {
            if (!err) {
              let levelUp = parseInt(event.returnValues[0]);
              alert(`FELICITATION !!! \n
              Votre Cannasson a gagné ${levelUp} point(s)!
              `);
              this.props.CallBackLoading();
              window.location.reload();
            }
          }
        );
      }
    );
  };

  gestation = async () => {
    let value = web3.utils.toWei(prompt("Combien demandez vous ?"), "finney");

    await CannassonRun.methods
      .proposerGestation(this.state.id, value)
      .send({ from: this.state.proprio }, function(error, transactionhash) {
        if (error) {
          alert(error);
        } else {
          alert(
            "est disponible pour la gestation, pensez à rafraichir " +
              transactionhash
          );
        }
      });
  };

  courrirUneCourse = async () => {
    await CannassonRun.methods
      .faireCourseGratuite(this.state.id)
      .send({ from: this.state.proprio }, () => {
        this.props.CallBackLoading();
        CannassonRun.events.allEvents(
          {
            fromBlock: this.state.blockNumber
          },
          (err, event) => {
            if (!err) {
              let cannasson = parseInt(event.returnValues[0]);
              let concurrent = parseInt(event.returnValues[1]);
              let winner = parseInt(event.returnValues[2]);
              this.props.CallBackLancerLaCourse(cannasson, concurrent, winner);
            }
          }
        );
      });
  };

  isShowChange = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  mettreEnVente = async () => {
    let hollandais = this.state.checkbox;
    let montant = this.state.enchereValue;
    montant = web3.utils.toWei(montant, "finney");
    let nom = this.state.nom;
    await CannassonRun.methods
      .proposerALaVente(this.state.id, hollandais, montant)
      .send({ from: this.state.proprio }, function(error, transactionhash) {
        if (error) {
          alert(error);
        } else {
          alert(
            nom +
              " Vient d'être mis en enchère, Pensez à rafraichir " +
              transactionhash
          );
        }
      });
  };

  handleChange = event => {
    this.setState({ enchereValue: event.target.value });
  };

  toggleChange = () => {
    this.setState({ checkbox: !this.state.checkbox });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Attente />
        ) : (
          <div>
            {this.state.isShow ? (
              <div>
                <div className="col-sm m-2 ">
                  <div className="card bg-light" id="card">
                    <h5 className="mt-1">{this.state.nom}</h5>
                    <button
                      className="my-1 mx-2 btn btn-white border"
                      onClick={this.changeName}
                    >
                      Changer de nom
                    </button>

                    <img
                      src={Cannasson001}
                      alt="Cannasson"
                      className="card-img-top mx-auto display-block"
                      style={{
                        width: 150,
                        alignItems: "center"
                      }}
                    />
                    <p className="card-text">
                      Famille : {this.state.famille} <br />
                      Categorie : {this.state.categorie} <br />
                      sexe : {this.state.sexe} <br />
                      level : {this.state.level} <br />
                      nombre de course : {this.state.nbreDeCourse} <br />
                      nombre de victoire : {this.state.nbreDeVictoire} <br />
                      nombre d'entrainement : {this.state.nbreEntrainement}{" "}
                      <br />
                      popularité : {this.state.popularite} <br />
                      nombre de dopage avéré : {this.state.nbreDopageAvere}{" "}
                      <br />
                    </p>
                    <div className="card-body">
                      <div className="btn-group-vertical">
                        <button
                          className="btn-block btn-primary"
                          onClick={this.sEntrainer}
                        >
                          S'entrainer
                        </button>
                        <button
                          className="btn-block btn-danger"
                          onClick={this.doper}
                        >
                          Doper votre Cannasson.
                        </button>
                        <button
                          className="btn-block btn-secondary"
                          onClick={this.courrirUneCourse}
                        >
                          Faire une course
                        </button>
                        <button
                          className="btn-block btn-info"
                          onClick={this.isShowChange}
                        >
                          Mettre en vente
                        </button>
                        <button
                          className="btn-block btn-warning"
                          onClick={this.gestation}
                        >
                          Rendre disponible pour Gestation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="col-sm m-2">
                  <button
                    className="btn-block btn-danger"
                    onClick={this.isShowChange}
                  >
                    Annuler
                  </button>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Nom : {this.state.nom}{" "}
                      </li>
                      <li className="list-group-item">
                        Level : {this.state.level}
                      </li>
                      <li className="list-group-item">
                        Nombre de Victoire(s) : {this.state.nbreDeVictoire}
                      </li>
                      <li className="list-group-item">
                        Popularité : {this.state.popularite}
                      </li>
                    </ul>
                  </div>
                  <div className="card-body alert alert-dark">
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item"> Mettre en enchère</li>
                      <li className="list-group-item">
                        Prix de départ
                        <input
                          name="enchereValue"
                          type="number"
                          className="ml-1"
                          value={this.state.enchereValue}
                          onChange={this.handleChange}
                        ></input>
                        Finney
                      </li>
                      <li className="list-group-item">
                        <input
                          name="checkbox"
                          type="checkbox"
                          value={this.state.checkbox}
                          onChange={this.toggleChange}
                        ></input>
                        Enchère Hollandaise ?
                      </li>
                    </ul>
                    <p>
                      ATTENTION: Votre cannasson ne sera plus dispo pour la
                      course durant la pèriode d'enchère.
                    </p>
                    <button
                      className="btn-block btn-warning"
                      onClick={this.mettreEnVente}
                    >
                      Soumettre
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default FicheCannasson;
