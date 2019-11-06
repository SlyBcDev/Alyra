import React, { Component } from "react";
import { CannassonRun, web3 } from "../config";
import "bootstrap/dist/css/bootstrap.css";
import BouttonCannasson from "./BouttonCannasson";

class DispoPourGestation extends Component {
  UNSAFE_componentWillMount() {
    this.loadCannassonData();
  }

  loadCannassonData = async () => {
    let id = this.props.id;
    let address = this.props.address;
    let nom = await CannassonRun.methods.nomDuCannasson(id).call();
    let sexe = await CannassonRun.methods.sexeDuCannasson(id).call();
    let level = await CannassonRun.methods.levelDuCannasson(id).call();
    let tarif = await CannassonRun.methods.tarifDemandePourGestation(id).call();
    tarif = web3.utils.fromWei(tarif, "finney");

    const nbreCannasson = await CannassonRun.methods
      .combienDeCannasson()
      .call();
    this.setState({ nbreCannasson });
    for (let i = 1; i <= nbreCannasson; i++) {
      let owner = await CannassonRun.methods.ownerOf(i).call();
      let sexe2 = await CannassonRun.methods.sexeDuCannasson(i).call();
      if (owner === address && sexe !== sexe2) {
        this.setState({
          mesCannassonsCompatibles: [...this.state.mesCannassonsCompatibles, i]
        });
      }
    }

    let blockNumber = await web3.eth.getBlockNumber();

    this.setState({ id, nom, sexe, level, tarif, address, blockNumber });
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      address: "",
      nom: "",
      sexe: "",
      level: 1,
      tarif: 0,
      mesCannassonsCompatibles: [],
      nbreCannasson: 0,
      blockNumber: 0
    };
  }

  callBackGestation = async parent2 => {
    let value = this.state.tarif;

    await CannassonRun.methods.payerPourGestation(this.state.id, parent2).send(
      {
        from: this.state.address,
        value: web3.utils.toWei(value, "finney")
      },
      () => {
        this.setState({ loading: true });
        CannassonRun.events.allEvents(
          {
            fromBlock: this.state.blockNumber
          },
          (err, event) => {
            if (!err) {
              let nom = event.returnValues[1];
              alert(
                `HERE COMES A NEW CHALENGER \n\n
                  ${nom} vient d'arriver dans votre ecurie \n
                      La page va se rafraichir`
              );
              this.setState({ loading: false });
              window.location.reload();
            }
          }
        );
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
                  sexe : {this.state.sexe} <br />
                  <strong>level : {this.state.level}</strong> <br />
                </p>
                <h6>Prix demandé: {this.state.tarif} Finney</h6>
                <p>Choisir mon Cannasson :</p>
                <div className="btn btn-group-vertical">
                  {this.state.mesCannassonsCompatibles.map(id => {
                    return (
                      <BouttonCannasson
                        key={id}
                        id={id}
                        callBackGestation={this.callBackGestation}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DispoPourGestation;
