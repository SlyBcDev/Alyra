import React, { Component } from "react";
import "./App.css";
import { ipfs, epinglage, web3 } from "./config";
import Web3 from "web3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      waiting: false,
      log: "",
      IPFShash: "",
      account: "",
      blockNumber: 0
    };
  }

  update = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    let blockNumber = await web3.eth.getBlockNumber();
    this.setState({ account, blockNumber });
  };

  componentDidMount() {
    this.update();
  }

  capturerFichier = e => {
    e.preventDefault();
    const fichier = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(fichier);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  onSubmit = async e => {
    this.setState({
      waiting: true,
      log: "envoi du fichier à IPFS, attente de la réponse"
    });
    e.preventDefault();
    ipfs.add(this.state.buffer, async (error, result) => {
      this.setState({
        IPFShash: result[0].hash,
        log: `Passons au paiement...`
      });
      await epinglage.methods.payerStockage(this.state.IPFShash).send(
        {
          from: this.state.account,
          value: Web3.utils.toWei("100", "finney")
        },
        () => {
          this.setState({ log: "paiement envoyé" });
          epinglage.events.allEvents(
            {
              fromBlock: this.state.blockNumber
            },
            (err, event) => {
              if (!err) {
                console.log(event.returnValues);
                alert(
                  `Votre fichier a été épinglé son hash est:${event.returnValues[0]}`
                );
                this.setState({ waiting: false, log: "" });
              }
            }
          );
        }
      );
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.waiting ? (
          <div>
            <h2>Merci de patienter</h2>
            <h4>{this.state.log}</h4>
          </div>
        ) : (
          <div>
            <h2>Epinglez votre document sur IPFS</h2>
            <form onSubmit={this.onSubmit}>
              <input type="file" onChange={this.capturerFichier} />
              <input type="submit" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default App;
