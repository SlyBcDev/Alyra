import React, { Component } from "react";
import "./App.css";
import { web3, CannassonRun } from "./config";
import Header from "./Header";
import FicheCannasson from "./FicheCannasson";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    const myAccount = accounts[0];
    this.setState({ account: myAccount });
    this.setState({ CannassonRun });
    const nbreCannasson = await CannassonRun.methods
      .combienDeCannasson()
      .call();
    this.setState({ nbreCannasson });
    for (let i = 0; i <= nbreCannasson; i++) {
      let owner = await CannassonRun.methods.ownerOf(i).call();
      if (owner === this.state.account) {
        this.setState({ monEcurie: [...this.state.monEcurie, i] });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      nbreCannasson: 0,
      monEcurie: []
    };
  }

  render() {
    return (
      <div className="App">
        <Header address={this.state.account} />
        {this.state.monEcurie.map((id, i) => {
          return <FicheCannasson key={i} id={id} />;
        })}
      </div>
    );
  }
}

export default App;
