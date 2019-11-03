import React, { Component } from "react";
import "./App.css";
import { web3, CannassonRun } from "./config";
import Header from "./Component/Header";
import FicheCannasson from "./Component/FicheCannasson";
import "bootstrap/dist/css/bootstrap.css";
import MonPremierCannasson from "./Component/MonPremierCannasson";
import NewCannasson from "./Component/NewCannasson";
import InfosVente from "./Component/InfosVente";
import DispoPourGestation from "./Component/dispoPourGestation";
import Course from "./Component/Course";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    const myAccount = accounts[0];
    let blockNumber = web3.eth.getBlockNumber((err, result) => {
      return result;
    });
    this.setState({ account: myAccount, blockNumber });
    const nbreCannasson = await CannassonRun.methods
      .combienDeCannasson()
      .call();
    this.setState({ nbreCannasson });
    for (let i = 1; i <= nbreCannasson; i++) {
      let owner = await CannassonRun.methods.ownerOf(i).call();
      if (owner === this.state.account) {
        this.setState({
          monEcurie: [...this.state.monEcurie, i]
        });
      }
    }

    for (let i = 1; i <= nbreCannasson; i++) {
      if (await CannassonRun.methods.estEnVente(i).call()) {
        this.setState({
          cannassonsEnVente: [...this.state.cannassonsEnVente, i]
        });
      }
    }

    for (let i = 1; i <= nbreCannasson; i++) {
      if (await CannassonRun.methods.estDispoPourGestation(i).call()) {
        this.setState({
          dispoPourGestation: [...this.state.dispoPourGestation, i]
        });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      nbreCannasson: 0,
      monEcurie: [],
      loading: true,
      placeDeMarche: false,
      cannassonsEnVente: [],
      dispoPourGestation: [],
      blockNumber: 0
    };
  }

  CallBackMonPremierCannasson = async () => {
    let myAccount = this.state.account;
    CannassonRun.methods.monPremierCannasson().send(
      { from: myAccount },
      CannassonRun.events.NewCannasson(
        {
          fromBlock: 0
        },
        (err, event) => {
          if (!err) {
            alert(event.returnValues[1]);
          }
        }
      )
    );
  };

  CallBackNewCannasson = async () => {
    CannassonRun.methods
      .plusDeCannasson()
      .send(
        { from: this.state.account, value: web3.utils.toWei("1", "finney") },
        function(error, transactionhash) {
          if (error) {
            alert(error);
          } else {
            CannassonRun.events.allEvents(
              {
                fromBlock: 0
              },
              (err, event) => {
                if (event) {
                  alert(event.returnValues[1]);
                }
              }
            );
          }
        }
      );
  };

  placeDeMarche = () => {
    this.setState({ placeDeMarche: !this.state.placeDeMarche });
  };

  render() {
    return (
      <div className="App display-block">
        <Header address={this.state.account} />
        <div className="bg-secondary m-3 p-2">
          {this.state.placeDeMarche ? (
            <h3 className="text-white" onClick={this.placeDeMarche}>
              Retourner dans mon écurie
            </h3>
          ) : (
            <h3 className="text-white" onClick={this.placeDeMarche}>
              Accédez à la place de marché
            </h3>
          )}
        </div>

        {this.state.placeDeMarche ? (
          <div>
            <div className="row">
              {this.state.cannassonsEnVente.map(id => {
                return <InfosVente key={id} id={id} />;
              })}
            </div>
            <div className="row">
              {this.state.dispoPourGestation.map(id => {
                return <DispoPourGestation key={id} id={id} />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="m-3 text-center">
              {this.state.monEcurie.length > 0 ? (
                <div className="row">
                  {this.state.monEcurie.map(id => {
                    return <FicheCannasson key={id} id={id} />;
                  })}
                </div>
              ) : (
                <MonPremierCannasson
                  CallBack={this.CallBackMonPremierCannasson}
                />
              )}
            </div>
            {this.state.monEcurie.length > 0 ? (
              <NewCannasson CallBack={this.CallBackNewCannasson} />
            ) : (
              <div />
            )}
          </div>
        )}
        <Course />
      </div>
    );
  }
}

export default App;

/*  

events function listenner

*/
CannassonRun.getPastEvents(
  "AllEvents",
  {
    fromBlock: 0,
    toBlock: "latest"
  },
  (err, events) => {
    console.log(events[6].returnValues[1]);
  }
);
