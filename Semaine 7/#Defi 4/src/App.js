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
import Attente from "./Component/Attente";
import MesAttentes from "./Component/MesAttentes";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData();
    this.loadRemboursementData();
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    const myAccount = accounts[0];
    let blockNumber = await web3.eth.getBlockNumber();
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

  loadRemboursementData = async () => {
    const accounts = await web3.eth.getAccounts();
    const myAccount = accounts[0];
    let peutEtreRembourse = await CannassonRun.methods
      .peutEtreRembourse(myAccount)
      .call();

    this.setState({ peutEtreRembourse });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      nbreCannasson: 0,
      monEcurie: [],
      loading: false,
      placeDeMarche: false,
      cannassonsEnVente: [],
      dispoPourGestation: [],
      blockNumber: 0,
      course: false,
      peutEtreRembourse: false,
      cannasson: 0,
      concurrent: 0,
      winner: 0
    };
  }

  CallBackMonPremierCannasson = async () => {
    let myAccount = this.state.account;
    CannassonRun.methods.monPremierCannasson().send({ from: myAccount }, () => {
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
    });
  };

  CallBackNewCannasson = async () => {
    CannassonRun.methods
      .plusDeCannasson()
      .send(
        { from: this.state.account, value: web3.utils.toWei("1", "finney") },
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

  placeDeMarche = () => {
    this.setState({ placeDeMarche: !this.state.placeDeMarche });
  };

  demanderRemboursement = async () => {
    await CannassonRun.methods
      .demanderRemboursement()
      .send({ from: this.state.account }, (err, result) => {
        if (!err) {
          alert(
            `Remboursement demandé. Vous recevrez bientôt les fonds dans votre wallet`
          );
          console.log(result);
        }
      });
  };

  CallBackLancerLaCourse = async (cannasson, concurrent, winner) => {
    this.setState({
      course: true,
      cannasson,
      concurrent,
      winner
    });
    let monCannasson = await CannassonRun.methods
      .nomDuCannasson(cannasson)
      .call();
    let monConcurent = await CannassonRun.methods
      .nomDuCannasson(concurrent)
      .call();
    let leWinner = await CannassonRun.methods.nomDuCannasson(winner).call();

    alert(`${monCannasson} va faire une course contre ${monConcurent}`);
    alert("La course va bientôt démarrer...");
    alert(`A vos marques !!!`);
    alert(`Prêt !!!`);
    alert(`Partez !!!`);
    alert(`...`);
    alert(`${leWinner} est le gagnant de la course !!! \n Bravo à lui !!!`);
    this.setState({
      loading: !this.state.loading,
      course: !this.state.course
    });
    window.location.reload();
  };

  CallBackLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    return (
      <div className="App display-block">
        <div>
          {this.state.course ? (
            <Course />
          ) : (
            <div>
              {this.state.loading ? (
                <Attente />
              ) : (
                <div>
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
                      <div>
                        <h1>Cannasson en vente:</h1>
                        <div className="row">
                          {this.state.cannassonsEnVente.map(id => {
                            return <InfosVente key={id} id={id} />;
                          })}
                        </div>
                      </div>
                      <div>
                        <h1>Cannasson prêt à enfanter:</h1>
                        <div className="row">
                          {this.state.dispoPourGestation.map(id => {
                            return <DispoPourGestation key={id} id={id} />;
                          })}
                        </div>
                      </div>
                      <div>
                        <h1>Mes offres en attente:</h1>
                        {this.state.peutEtreRembourse ? (
                          <div>
                            <div className="card bg-warning">
                              <h4>Vous avez un remboursement en attente !</h4>
                              <button
                                className="btn-warning"
                                onClick={this.demanderRemboursement}
                              >
                                Demander le remboursement
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                        <div className="row">
                          {this.state.cannassonsEnVente.map(id => {
                            return <MesAttentes key={id} id={id} />;
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="m-3 text-center">
                        {this.state.monEcurie.length > 0 ? (
                          <div className="row">
                            {this.state.monEcurie.map(id => {
                              return (
                                <FicheCannasson
                                  key={id}
                                  id={id}
                                  CallBackLancerLaCourse={
                                    this.CallBackLancerLaCourse
                                  }
                                  CallBackLoading={this.CallBackLoading}
                                />
                              );
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
