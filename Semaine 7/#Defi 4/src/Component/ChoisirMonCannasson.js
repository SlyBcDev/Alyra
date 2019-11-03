import React, { Component } from "react";
import { web3, CannassonRun } from "../config";
import "bootstrap/dist/css/bootstrap.css";
import BouttonCannasson from "./BouttonCannasson";

class ChoisirMonCannasson extends Component {
  UNSAFE_componentWillMount() {
    this.loadEcurieData();
    this.loadWalletData();
  }

  async loadWalletData() {
    let accounts = await web3.eth.getAccounts();
    let myAccount = accounts[0];
    this.setState({ myAccount });
  }

  async loadEcurieData() {
    const accounts = await web3.eth.getAccounts();
    const myAccount = accounts[0];
    this.setState({ account: myAccount });
    this.setState({ CannassonRun });
    const nbreCannasson = await CannassonRun.methods
      .combienDeCannasson()
      .call();
    this.setState({ nbreCannasson });

    const idCible = this.props.idCible;

    for (let i = 1; i <= nbreCannasson; i++) {
      let owner = await CannassonRun.methods.ownerOf(i).call();
      if (owner === this.state.account) {
        let sexeMonCannasson = await CannassonRun.methods
          .sexeDuCannasson(i)
          .call();
        let sexeCannassonCible = await CannassonRun.methods
          .sexeDuCannasson(idCible)
          .call();
        if (sexeCannassonCible !== sexeMonCannasson)
          this.setState({
            mesCannassonReproducteur: [
              ...this.state.mesCannassonReproducteur,
              i
            ]
          });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      myAccount: "",
      mesCannassonReproducteur: []
    };
  }

  CallBack = () => {};

  render() {
    return (
      <div>
        <div>
          {this.state.monEcurie.map(id => {
            return (
              <BouttonCannasson key={id} id={id} CallBack={this.CallBack} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ChoisirMonCannasson;
