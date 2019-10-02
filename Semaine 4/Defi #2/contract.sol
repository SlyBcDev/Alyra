pragma solidity ^0.5.11;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract PlaceDeMarche {
    
  using SafeMath for uint256;
    
  mapping (address => uint8) reputation; // chaque adresse part avec une réputation de 0.
  mapping (address => bool) entreprise; // une adresse peut etre considérer comme celle d'une entreprise si elle a fait une offre de mission
  address[] admin; // tableau des administrateurs.
  Utilisateur[] utilisateurs; // tableau des utilisateurs
  address[] adresseBannies; // tableau des adresses bannies. 
  
  struct travailRemis{ // un travail remis correspond à une adresse, l'indice de l'offre à laquelle on repond et le hash de l'url ou se trouve le travail.
      address adresse;
      uint indiceOffre;
      string hash;
      bool travailAccepte;
      uint salaire;
      address adresseProprio;
  }
  
  travailRemis[] tableauDesTravauxRemis; // un tableau de tavaux remis.
  
  
  struct Utilisateur{ // un utilisateur est un nom et une adresse.
      string nom;
      address adresse;
  }
  
  constructor() public{
      admin.push(msg.sender);
  }

  enum etatOffre {OUVERTE,ENCOURS,FERMEE}  // une offre a 3 statuts

  struct offreMission { // structure d'une offre de mission
    uint prix;
    uint delaiAcceptation; // le delai sera une valeur en milliseconde
    string description;
    etatOffre statut;
    uint reputationMinimum; // il faut une reputation minimum pour postuler à une offre. 
    address proprietaire; // ceci est l'adresse du créateur de l'offre. 
  }
  
  
  struct CandidatOffre{ // un candidat à une offre est une adresse associer à l'index de l'offre dans le tableau des offres.
      address adresse;
      uint quelleOffre;
      bool offreAcceptee;
  }
  CandidatOffre[] candidats; // tableau des candidats associer à l'offre à laquelle il a postulé, le candidat peut postuler à plusieurs offres, dans ce cas son adresse apparaitra plusieurs fois dans le tableau..
  
  offreMission[] tableauDesOffres; // tableau de toutes les offres de mission faites par des entreprises.
  
  function ajouterOffre(
      uint prix,
      uint delaiAcceptation,
      string memory description,
      uint reputationMinimum) 
      public payable{
      require(estUtilisateur(msg.sender)==true,"Vous n'avez pas le droit d'ajouter une offre, inscivez vous d'abord."); 
      uint commission = (msg.value.div(102)).mul(100); // 2% de comission pour la plateforme.
      prix = msg.value.sub(commission); // le salaire pour cette mission.
      tableauDesOffres.push(offreMission(prix,delaiAcceptation,description,etatOffre.OUVERTE,reputationMinimum,msg.sender));
      entreprise[msg.sender] = true; // le créateur de l'offre est considéré comme une entreprise.
  }
  
  function accepterOffre(uint indice, address adresse) public {
      require(entreprise[msg.sender],"Vous n'avez pas fait d'offres.");
      for(uint i = 0; i<tableauDesOffres.length; i++){
          if(tableauDesOffres[i].proprietaire==msg.sender){
            for(uint j=0; j<candidats.length; j++){
              if(candidats[j].adresse == adresse && candidats[j].quelleOffre==indice){
                  tableauDesOffres[i].statut = etatOffre.ENCOURS;
                  candidats[j].offreAcceptee = true;
                }
            }
        }
    }
  }
  
  function postuler(uint j)public{
      require(estUtilisateur(msg.sender),"Vous n'êtes pas enregistré sur la plateforme.");
      require(reputation[msg.sender]>tableauDesOffres[j].reputationMinimum,"Vous ne pouvez pas candidater à cette offre. (réputation trop faible)");
      require(tableauDesOffres[j].statut == etatOffre.OUVERTE);
      candidats.push(CandidatOffre(msg.sender,j,false));
  }
  
  function livraison(string memory hash, uint indiceOffre) public {
      for(uint i=0;i<tableauDesOffres.length;i++){
      require(candidats[i].adresse==msg.sender && candidats[i].quelleOffre == indiceOffre && candidats[i].offreAcceptee, "Vous ne pouvez pas remettre de proposition pour cette offre.");
        tableauDesTravauxRemis.push(travailRemis(msg.sender,indiceOffre,hash,false,tableauDesOffres[i].prix,tableauDesOffres[i].proprietaire));
        tableauDesOffres[i].statut = etatOffre.FERMEE;
      }
  }
  
  function validerLeTravailRecu (uint indice) public {
      require(entreprise[msg.sender],"Vous n'avez pas fait d'offres.");
      require(tableauDesTravauxRemis[indice].adresseProprio == msg.sender,"Vous n'avez aucun droit sur cette offre");
      tableauDesTravauxRemis[indice].travailAccepte = true;
      reputation[tableauDesTravauxRemis[indice].adresse]+=1;
  }
  
  function reclamerSalaire(uint indice) public payable{
      require(tableauDesTravauxRemis[indice].adresse == msg.sender,"Ce n'est pas votre travail.");
      address(msg.sender).transfer(tableauDesTravauxRemis[indice].salaire);
  }
  
  
  function sInscrire(string memory nom) public{
      require(estUtilisateur(msg.sender) == false,"Vous êtes déjà inscrit");
      require(estBannie(msg.sender)== false, "Vous n'êtes pas autorisé à nous rejoindre.");
      utilisateurs.push(Utilisateur(nom,msg.sender));
      reputation[msg.sender] =1;
  }
   
  function estUtilisateur(address adresse) public view returns(bool){
      for(uint i=0; i<utilisateurs.length; i++){
          if(utilisateurs[i].adresse == adresse){
              return true;
          }
      }
  }
  
  function estBannie(address adresse) public view returns(bool){
      for(uint i=0; i<adresseBannies.length; i++){
          if(adresseBannies[i] == adresse){
              return true;
          }
      }
  }
  
  function estAdmin(address utilisateur) public view returns(bool) {
        for (uint i=0;i<admin.length; i++){
            if(admin[i] == utilisateur){
                return true;
            }
        }
    }
  
  function bannir(address adresseABanir) public {
      require(estAdmin(msg.sender),"Vous n'êtes pas administrateur. ");
      for(uint i=0; i<utilisateurs.length; i++){
            if(utilisateurs[i].adresse == adresseABanir){
            delete utilisateurs[i];
            reputation[adresseABanir] = 0;
            adresseBannies.push(adresseABanir);
            }
        }
    } 
}
