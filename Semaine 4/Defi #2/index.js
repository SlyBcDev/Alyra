const addressContrat = "0xe93d6727b242aea0dcb20582c845d491ce4a4a50";

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "adresseCandidat",
				"type": "address"
			}
		],
		"name": "accepterCandidature",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "adresse",
				"type": "address"
			}
		],
		"name": "accepterTravail",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "prix",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "delaiAcceptation",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "reputationMinimum",
				"type": "uint256"
			}
		],
		"name": "ajouterOffre",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "adresseABanir",
				"type": "address"
			}
		],
		"name": "bannir",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "indiceOffre",
				"type": "uint256"
			}
		],
		"name": "livraison",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "j",
				"type": "uint256"
			}
		],
		"name": "postuler",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "adresseCandidat",
				"type": "address"
			}
		],
		"name": "rejeterCandidat",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "nom",
				"type": "string"
			}
		],
		"name": "sInscrire",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			}
		],
		"name": "validerLeTravailRecu",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "adresseUtilisateurs",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "afficherCandidatureAcceptee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "indice",
				"type": "uint256"
			}
		],
		"name": "afficherLivraison",
		"outputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "canditature1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "canditature2",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "canditature3",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "delaiOffre",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "descriptionOffre",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "adresse",
				"type": "address"
			}
		],
		"name": "estAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "adresse",
				"type": "address"
			}
		],
		"name": "estBannie",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "adresse",
				"type": "address"
			}
		],
		"name": "estUtilisateur",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "etatActuelOffre",
		"outputs": [
			{
				"internalType": "enum PlaceDeMarche.etatOffre",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nombreDOffres",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nombreDUtilisateurs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "nomUtilisateur",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proprietaireOffre",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "reputation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reputationRequiseOffre",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "salaireOffre",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tableauDesTravauxRemis",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "adresse",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "indiceOffre",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "travailAccepte",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "salaire",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "adresseProprio",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const provider = new ethers.providers.Web3Provider(ethereum);
let contractMarketPlace = new ethers.Contract(
  addressContrat,
  abi,
  provider.getSigner()
);

async function _bannir() {
  try {
    await ethereum.enable();
    let addressToBan = "0x50d26580761c4bd47fc14b9c64911467983d90e4";
    await contractMarketPlace.bannir(addressToBan);
  } catch (err) {
    console.log(err);
  }
}

async function _sinscrire() {
  try {
    await ethereum.enable();
    let nom = document.getElementById("nom").value;
    await contractMarketPlace.sInscrire(nom);
  } catch (err) {
    console.log(err);
  }
}

async function _ajouterOffre() {
  try {
    await ethereum.enable();
    let salaire = document.getElementById("salaire").value;
    let paiement = {
      value: ethers.utils.parseEther(salaire)
    };

    let delai = document.getElementById("delai").value;
    let reputationReq = document.getElementById("reputationReq").value;
    let description = document.getElementById("description").value;
    await contractMarketPlace.ajouterOffre(
      salaire,
      delai,
      description,
      reputationReq,
      paiement
    );
  } catch (err) {
    console.log(err);
  }
}

async function _afficherOffre() {
  let nbreOffres = parseInt(await contractMarketPlace.nombreDOffres());

  for (i = 0; i < nbreOffres; i++) {
    let id = i + 1;
    let description = await contractMarketPlace.descriptionOffre(id);
    let salaire = parseInt(await contractMarketPlace.salaireOffre(id));
    let delai = parseInt(await contractMarketPlace.delaiOffre(id));
    let etat = "";
    let repRequise = parseInt(
      await contractMarketPlace.reputationRequiseOffre(id)
    );
    let nomProprio = await contractMarketPlace.nomUtilisateur(
      contractMarketPlace.proprietaireOffre(id)
    );

    if ((await contractMarketPlace.etatActuelOffre(id)) == 0) {
      etat = "OUVERTE";
    } else if ((await contractMarketPlace.etatActuelOffre(id)) == 1) {
      etat = "ENCOURS";
    } else if ((await contractMarketPlace.etatActuelOffre(id)) == 2) {
      etat = "FERMEE";
    }
    document
      .getElementById("tableau")
      .appendChild(document.createElement("tr")).innerHTML = ` 
    <th scope="row" >${id}</th>
    <td>${nomProprio}</td>
    <td>${salaire}</td>
    <td>${repRequise}</td>
    <td>${description}</td>
    <td>${etat}</td>`;
  }
}

async function _postuler() {
  let id = document.getElementById("quelleOffre").value;
  await contractMarketPlace.postuler(id - 1);
  alert(`Vous avez fait une demande pour la mission ${id}`);
}

async function _afficherCandidats() {
  let nombreDUtilisateurs = parseInt(await contractMarketPlace.nombreDUtilisateurs());
  let nombreDOffres = parseInt(await contractMarketPlace.nombreDOffres());
 
   for(let i=0; i<nombreDUtilisateurs; i++){
      let candidat = await contractMarketPlace.nomUtilisateur(
        await contractMarketPlace.adresseUtilisateurs(i));
      let reputation = parseInt(await contractMarketPlace.reputation(
        await contractMarketPlace.adresseUtilisateurs(i)));
      let candidature1 = await contractMarketPlace.canditature1(
        await contractMarketPlace.adresseUtilisateurs(i));
      let candidature2 = parseInt(await contractMarketPlace.canditature2(
        await contractMarketPlace.adresseUtilisateurs(i)));
      let candidature3 = parseInt(await contractMarketPlace.canditature3(
        await contractMarketPlace.adresseUtilisateurs(i)));

     if(candidature1 != 0){      
      document
      .getElementById("tableauCandidats")
      .appendChild(document.createElement("tr")).innerHTML = ` 
      <th scope="row" >${i}</th>
      <td>${candidat}</td>
      <td>${reputation}</td>
      <td>${candidature1}</td>
      <td>${await contractMarketPlace.descriptionOffre(candidature1)}</td>
      <td><button class="btn-danger btn-sm" onclick="_rejeterCandidat(${i},${candidature1})">X</button>
      <td><button class="btn-success btn-sm" onclick="_accepterCandidature(${i},${candidature1})">X</button>`; 
      }

      if(candidature2 != 0){      
      document
      .getElementById("tableauCandidats")
      .appendChild(document.createElement("tr")).innerHTML = ` 
      <th scope="row" >${i}</th>
      <td>${candidat}</td>
      <td>${reputation}</td>
      <td>${candidature2}</td>
      <td>${await contractMarketPlace.descriptionOffre(candidature2)}</td>
      <td><button class="btn-danger btn-sm" onclick="_rejeterCandidat(${i},${candidature2})">X</button>
      <td><button class="btn-success btn-sm" onclick="_accepterCandidature(${i},${candidature2})">X</button>`; 
      }

      if(candidature3 != 0){      
      document
      .getElementById("tableauCandidats")
      .appendChild(document.createElement("tr")).innerHTML = ` 
      <th scope="row" >${i}</th>
      <td>${candidat}</td>
      <td>${reputation}</td>
      <td>${candidature3}</td>
      <td>${await contractMarketPlace.descriptionOffre(candidature3)}</td>
      <td><button class="btn-danger btn-sm" onclick="_rejeterCandidat(${i},${candidature3})">X</button>
      <td><button class="btn-success btn-sm" onclick="_accepterCandidature(${i},${candidature3})">X</button>`;  
      }
  }
}

async function _rejeterCandidat(i,candidature){
  let adresseCandidat = await contractMarketPlace.adresseUtilisateurs(i);
  await contractMarketPlace.rejeterCandidat(candidature,adresseCandidat)
};
async function _accepterCandidature(i,candidature){
  let adresseCandidat = await contractMarketPlace.adresseUtilisateurs(i);
  await contractMarketPlace.accepterCandidature(candidature,adresseCandidat)
};

async function _visualiser(){
  let i = await contractMarketPlace.afficherCandidatureAcceptee();
  console.log(i);

  document.getElementById("aFaire").innerHTML= ` 
  <p> Vous devez réaliser la mission ${i} </p> 
  <input placeHolder="url de votre illustration" class="ml-2"type="text" id="url"/> 
  <button class="btn-primary" onclick="_remettreIllustration()"> Envoyer </button>`

  _remettreIllustration = () => {
    let url = document.getElementById("url").value;
    _livraison(url,i);
  }
}

async function _livraison(url,i) {
await contractMarketPlace.livraison(url,i);
}