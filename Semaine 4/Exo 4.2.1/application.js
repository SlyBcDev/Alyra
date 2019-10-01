const provider = new ethers.providers.Web3Provider(ethereum);

async function createMetaMaskDapp() {
  try {
    // Demande à MetaMask l'autorisation de se connecter
    const addresses = await ethereum.enable();
    const address = addresses[0];
    // Connection au noeud fourni par l'objet web3
    dapp = { address, provider };
    console.log(dapp);
  } catch (err) {
    // Gestion des erreurs
    console.error(err);
  }
}
async function balance() {
  dapp.provider.getBalance(dapp.address).then(balance => {
    let etherString = ethers.utils.formatEther(balance);
    console.log("Balance: " + etherString);
  });
}

async function getBlock() {
  provider.getBlockNumber().then(blockNumber => {
    console.log("Current block number: " + blockNumber);
    document.getElementById(
      "block"
    ).textContent = `Le dernier bloc est: ${blockNumber}`;
  });
}

async function prixGasActuel() {
  provider.getGasPrice().then(gasPrice => {
    // gasPrice is a BigNumber; convert it to a decimal string
    gasPriceString = gasPrice.toString();

    console.log("Current gas price: " + gasPriceString);
    document.getElementById(
      "gas"
    ).textContent = `Le prix du gas actuel est: ${gasPriceString}`;
  });
}
