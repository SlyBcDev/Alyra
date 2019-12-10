import epinglageABI from "./epinglageABI.json";
import Web3 from "web3";

const epinglageContractAddress = "0xd53b499d00a90fe7a070d830d51e76955352585d";

export const web3 = new Web3(
  Web3.givenProvider || "kovan.infura.io/v3/da3c3685867d470b8b9a8a6dffd6ffd0"
);

export const epinglage = new web3.eth.Contract(
  epinglageABI,
  epinglageContractAddress
);

const ipfsClient = require("ipfs-http-client");
export const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
