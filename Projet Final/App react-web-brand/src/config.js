import Web3 from "web3";
import deezmineContractABI from "./deezmineContractABI.json";

const CONTRACT_ADDRESS = "0xa760fa94531c1d81bc84d04cea27163a565de003"; //testnet kovan

export const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
export const deezMine = new web3.eth.Contract(
  deezmineContractABI,
  CONTRACT_ADDRESS
);
