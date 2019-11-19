import React, { Component } from "react";
import { deezMine, web3 } from "../config";

class InstrumentInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      brand: "",
      model: "",
      type: "",
      name: "",
      ownerAddress: "",
      ownerNickName: "",
      birthDate: "",
      serialNumber: "",
      isStolenOrLost: false
    };
  }

  update = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    let brand = await deezMine.methods.getBrand(account).call();
    let model = await deezMine.methods.getModel(account).call();
    let type = await deezMine.methods.getType(account).call();
    let name = await deezMine.methods.getName(account).call();
    let ownerAddress = await deezMine.methods.getOwnerAddress(account).call();
    let ownerNickName = await deezMine.methods.getOwnerNickName(account).call();
    let birthDate = await deezMine.methods.getBirthday(account).call();
    let serialNumber = await deezMine.methods.getSerialNumber(account).call();
    let isStolenOrLost = await deezMine.methods.getIsStolen(account).call();

    console.log(
      account,
      brand,
      model,
      type,
      name,
      ownerAddress,
      ownerNickName,
      birthDate,
      serialNumber,
      isStolenOrLost
    );

    this.setState({
      account,
      brand,
      model,
      type,
      name,
      ownerAddress,
      ownerNickName,
      birthDate,
      serialNumber,
      isStolenOrLost
    });
  };

  componentDidMount() {
    this.update();
  }

  render() {
    return <div>{this.state.brand}</div>;
  }
}

export default InstrumentInfos;
