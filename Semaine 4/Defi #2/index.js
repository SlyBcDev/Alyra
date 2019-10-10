// Pour lancer le serveur: "npx live-server"

const addressContrat = "0xbcaedac5cf8210d03f23add4f471341ae417e638"; // Kovan Testnet

const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "canditature2Acceptee",
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
		"name": "travailAccepteCandidature2",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "travailAccepteCandidature1",
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
		"inputs": [],
		"name": "nombreDeTravauxRemis",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "canditature1Acceptee",
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
		"name": "canditature3Acceptee",
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
		"name": "travailAccepteCandidature3",
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
				"name": "indice",
				"type": "uint256"
			}
		],
		"name": "reclamerPaiement",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
		"payable": false,
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

const provider = new ethers.providers.Web3Provider(ethereum);
let contractMarketPlace = new ethers.Contract(
  addressContrat,
  abi,
  provider.getSigner()
);

/*
async function _bannir() {
  try {
    await ethereum.enable();
    let addressToBan = "0x50d26580761c4bd47fc14b9c64911467983d90e4";
    await contractMarketPlace.bannir(addressToBan);
  } catch (err) {
    console.log(err);
  }
}
*/

async function _sinscrire() {
  try {
    await ethereum.enable();
    let nom = document.getElementById("nom").value;
    await contractMarketPlace.sInscrire(nom);
    alert(`Vous êtes inscrit sous le nom ${nom}`);
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
    let delai = Date.parse(document.getElementById("delai").value);
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
      etat = "EN_COURS";
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
  try {
    let id = document.getElementById("quelleOffre").value;
    await contractMarketPlace.postuler(id);
    alert(`Vous avez fait une demande pour la mission ${id}`);
  } catch (error) {
    alert(error);
  }
}

async function _afficherCandidats() {
  let nombreDUtilisateurs = parseInt(
    await contractMarketPlace.nombreDUtilisateurs()
  );
  let nombreDOffres = parseInt(await contractMarketPlace.nombreDOffres());

  for (let i = 0; i < nombreDUtilisateurs; i++) {
    let candidat = await contractMarketPlace.nomUtilisateur(
      await contractMarketPlace.adresseUtilisateurs(i)
    );
    let reputation = parseInt(
      await contractMarketPlace.reputation(
        await contractMarketPlace.adresseUtilisateurs(i)
      )
    );
    let candidature1 = await contractMarketPlace.canditature1(
      await contractMarketPlace.adresseUtilisateurs(i)
    );
    let candidature2 = parseInt(
      await contractMarketPlace.canditature2(
        await contractMarketPlace.adresseUtilisateurs(i)
      )
    );
    let candidature3 = parseInt(
      await contractMarketPlace.canditature3(
        await contractMarketPlace.adresseUtilisateurs(i)
      )
    );

    if (candidature1 != 0) {
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

      if (candidature2 != 0) {
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

      if (candidature3 != 0) {
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
}

async function _rejeterCandidat(i, candidature) {
  try {
    let adresseCandidat = await contractMarketPlace.adresseUtilisateurs(i);
    await contractMarketPlace.rejeterCandidat(candidature, adresseCandidat);
    alert("Le candidat a été rejeté.");
  } catch (error) {
    alert(error);
  }
}

async function _accepterCandidature(i, candidature) {
  try {
    let adresseCandidat = await contractMarketPlace.adresseUtilisateurs(i);
    await contractMarketPlace.accepterCandidature(candidature, adresseCandidat);
    alert("La candidature a été accepté.");
  } catch (error) {
    alert(error);
  }
}

async function _visualiser() {
  let i = parseInt(await contractMarketPlace.afficherCandidatureAcceptee());

  document.getElementById("aFaire").innerHTML = ` 
  <p class="ml-2"> Vous devez réaliser la mission ${i} </p> 
  <input placeHolder="url de votre illustration" class="ml-2"type="text" id="url"/> 
  <button class="btn-primary" onclick="_remettreIllustration()"> Envoyer </button>`;

  _remettreIllustration = () => {
    let url = document.getElementById("url").value;
    _livraison(url, i);
  };
}

async function _livraison(url, i) {
  url = ethers.utils.hashMessage(url);
  try {
    await contractMarketPlace.livraison(url, i);
    alert("Travail remis");
  } catch (error) {
    alert(error);
  }
}

async function _afficherLivraison() {
  let nbreTravaux = parseInt(await contractMarketPlace.nombreDeTravauxRemis());
  console.log(nbreTravaux);

  for (i = 0; i <= nbreTravaux; i++) {
    let hash = await contractMarketPlace.afficherLivraison(i);
    let candidat = await contractMarketPlace.nomUtilisateur(
      await contractMarketPlace.adresseUtilisateurs(i)
    );
    if (hash) {
      document
        .getElementById("tableauLivraisons")
        .appendChild(document.createElement("tr")).innerHTML = ` 
      <th scope="row" ></th>
      <td>${candidat}</td>
      <td>${hash}</td>
      <td>${i}</td>
      <td>${await contractMarketPlace.descriptionOffre(i)}</td>
      <td><button class="btn-danger btn-sm" onclick="_rejeterLivraison()">X</button>
	  <td><button class="btn-success btn-sm" onclick="_accepterLivraison(${i})">X</button>`;
    }
  }
}

async function _rejeterLivraison() {
  alert(
    "Nous allons envoyer un Mail au candidat pour lui signifier votre refus."
  );
}

async function _accepterLivraison(i) {
  try {
    await contractMarketPlace.validerLeTravailRecu(i);
    alert(
      "Vous avez validé ce travail. Le candidat peut prétendre à son paiement."
    );
  } catch (error) {
    alert(error);
  }
}

async function _reclamerPaiement() {
  let i = parseInt(await contractMarketPlace.afficherCandidatureAcceptee());
  try {
    await contractMarketPlace.reclamerPaiement(i);
    alert("Mission accomplie !!!");
  } catch (error) {
    alert(error);
  }
}
