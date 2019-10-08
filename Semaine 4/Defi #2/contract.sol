pragma solidity ^0.5.11;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract PlaceDeMarche {
    
  using SafeMath for uint256;
    
  mapping (address => uint) public reputation; // chaque adresse part avec une réputation de 0.
  mapping (address => bool) entreprise; // une adresse peut etre considérer comme celle d'une entreprise si elle a fait une offre de mission
  mapping (address => bool) utilisateur;
  mapping (address => bool) adresseBannie;
  mapping (address => bool) admin;
  mapping (address => string) public nomUtilisateur;
  uint public nombreDUtilisateurs;
  uint public nombreDOffres;
  uint[] listeDesOffres;
  address[] public adresseUtilisateurs;
  
  constructor() public{
      admin[msg.sender]=true;
  }
  
  enum etatOffre {OUVERTE,ENCOURS,FERMEE}  // une offre a 3 statuts

  mapping (uint => uint) public salaireOffre;
  mapping (uint => uint) public delaiOffre;
  mapping (uint => string) public descriptionOffre;
  mapping (uint => etatOffre) public etatActuelOffre;
  mapping (uint => uint) public reputationRequiseOffre;
  mapping (uint => address) public proprietaireOffre;
  
  mapping (address => uint) public canditature1;
  mapping (address => uint) public canditature2;
  mapping (address => uint) public canditature3; // Il est possible qu'un illustrateur candidate à maximum 3 offres à la fois.
  
  function ajouterOffre(
      uint prix,
      uint delaiAcceptation,
      string memory description,
      uint reputationMinimum) 
      public payable{
      require(estUtilisateur(msg.sender)==true,"Vous n'avez pas le droit d'ajouter une offre, inscivez vous d'abord."); 
      uint commission = (msg.value.div(102)).mul(2); // 2% de comission pour la plateforme.
      prix = msg.value.sub(commission); // le salaire pour cette mission.
      nombreDOffres+=1;
      uint idOffre = nombreDOffres;
      salaireOffre[idOffre]=prix;
      delaiOffre[idOffre]=delaiAcceptation;
      descriptionOffre[idOffre]=description;
      etatActuelOffre[idOffre]=etatOffre.OUVERTE;
      reputationRequiseOffre[idOffre]=reputationMinimum;
      proprietaireOffre[idOffre]=msg.sender;
      entreprise[msg.sender] = true; // le créateur de l'offre est considéré comme une entreprise.
      listeDesOffres.push(idOffre);
  }
  
  struct travailRemis{ // un travail remis correspond à une adresse, l'indice de l'offre à laquelle on repond et le hash de l'url ou se trouve le travail.
      address payable adresse;
      uint indiceOffre;
      string hash;
      bool travailAccepte;
      uint salaire;
      address adresseProprio;
  }
  
  travailRemis[] public tableauDesTravauxRemis; // un tableau de tavaux remis.
  
  struct CandidatOffre{ // un candidat à une offre est une adresse associer à l'index de l'offre dans le tableau des offres.
      address adresse;
      uint quelleOffre;
      bool candidatureAcceptee;
      bool offreAcceptee;
  }
  
 CandidatOffre[] candidats; // tableau des candidats associé à l'offre à laquelle il a postulé, le candidat peut postuler à plusieurs offres, dans ce cas son adresse apparaitra plusieurs fois dans le tableau..
 
  function afficherCandidatureAcceptee() public view returns(uint){
      for(uint i=0; i< candidats.length; i++){
            if(candidats[i].adresse == msg.sender && candidats[i].offreAcceptee == true){
                return(candidats[i].quelleOffre);
            } 
      }
  }
 
  function rejeterCandidat(uint indice, address adresseCandidat)public{
     require(proprietaireOffre[indice] == msg.sender,"Vous n'êtes pas propriétaire de cette offre");
     require(canditature1[adresseCandidat] == indice || canditature2[adresseCandidat] == indice || canditature3[adresseCandidat] == indice,"Ce candidat n'a pas candidaté à cette offre.");
     if(canditature1[msg.sender] == indice){
          canditature1[msg.sender] = 0;
      } else if(canditature2[msg.sender] == indice){
          canditature2[msg.sender] = 0;
      } else if(canditature3[msg.sender] == indice){
          canditature3[msg.sender] = 0;
      }
 }
 
 function accepterCandidature(uint indice, address adresseCandidat) public{
    require(proprietaireOffre[indice] == msg.sender,"Vous n'êtes pas propriétaire de cette offre");
    require(canditature1[adresseCandidat] == indice || canditature2[adresseCandidat] == indice || canditature3[adresseCandidat] == indice,"Ce candidat n'a pas candidaté à cette offre.");
    for(uint i=0; i<candidats.length;i++){
        if(candidats[i].quelleOffre==indice){
            candidats[i].candidatureAcceptee = true;
        }
    }
    etatActuelOffre[indice]= etatOffre.ENCOURS;
 }
 
  function accepterTravail(uint indice, address adresse) public {
      require(entreprise[msg.sender],"Vous n'avez pas fait d'offres.");
      for(uint i = 0; i<listeDesOffres.length; i++){
          if(proprietaireOffre[i]==msg.sender){
            for(uint j=0; j<candidats.length; j++){
              if(candidats[j].adresse == adresse && candidats[j].quelleOffre==indice){
                  etatActuelOffre[i] = etatOffre.ENCOURS;
                  candidats[j].offreAcceptee = true;
                }
            }
        }
    }
  }
  
  function postuler(uint j)public{
      require(canditature1[msg.sender]==0 || canditature2[msg.sender]==0 || canditature3[msg.sender]==0 ,"Vous ne pouvez postuler qu'à une seule offre.");
      require(estUtilisateur(msg.sender),"Vous n'êtes pas enregistré sur la plateforme.");
      require(reputation[msg.sender]>=reputationRequiseOffre[j],"Vous ne pouvez pas candidater à cette offre. (réputation trop faible)");
      require(etatActuelOffre[j] == etatOffre.OUVERTE);
      if(canditature1[msg.sender] == 0){
          canditature1[msg.sender] = j;
      } else if(canditature2[msg.sender] == 0){
          canditature2[msg.sender] = j;
      } else if(canditature3[msg.sender] == 0){
          canditature3[msg.sender] = j;
      }
      candidats.push(CandidatOffre(msg.sender,j,false,false));
  }
  
  function livraison(string memory hash, uint indiceOffre) public {
      for(uint i=0; i<candidats.length ; i++){
          if(candidats[i].quelleOffre==indiceOffre && candidats[i].candidatureAcceptee == true){
            tableauDesTravauxRemis.push(travailRemis(msg.sender,indiceOffre,hash,false,salaireOffre[indiceOffre],proprietaireOffre[indiceOffre]));
          }
      }
    }
  
  function afficherLivraison(uint indice) public view returns(string memory hash){
      for(uint i=0; i<tableauDesTravauxRemis.length; i++){
          if(tableauDesTravauxRemis[i].indiceOffre == indice ){
              return(tableauDesTravauxRemis[i].hash);
          }
      }
  }
  
  function validerLeTravailRecu (uint indice) public payable{
    require(entreprise[msg.sender],"Vous n'avez pas fait d'offres.");
      for(uint i=0; i<tableauDesTravauxRemis.length; i++){
          if(tableauDesTravauxRemis[i].indiceOffre == indice
          && tableauDesTravauxRemis[i].adresseProprio == msg.sender){
            tableauDesTravauxRemis[i].travailAccepte = true;
            etatActuelOffre[i]= etatOffre.FERMEE;
            reputation[tableauDesTravauxRemis[indice].adresse]+=1;
            (tableauDesTravauxRemis[i].adresse).transfer(tableauDesTravauxRemis[i].salaire);
          }
        }
  }
  
  function sInscrire(string memory nom) public{
      require(estUtilisateur(msg.sender) == false,"Vous êtes déjà inscrit");
      require(estBannie(msg.sender)== false, "Vous n'êtes pas autorisé à nous rejoindre.");
      nomUtilisateur[msg.sender]=nom;
      utilisateur[msg.sender]= true;
      reputation[msg.sender] = 1;
      nombreDUtilisateurs+=1;
      adresseUtilisateurs.push(msg.sender);
  }
   
  function estUtilisateur(address adresse) public view returns(bool){
   return(utilisateur[adresse]);
  }
  
  function estBannie(address adresse) public view returns(bool){
    return(adresseBannie[adresse]);
  }
  
  function estAdmin(address adresse) public view returns(bool) {
    return(admin[adresse]);
  }
  
  function bannir(address adresseABanir) public {
    require(estAdmin(msg.sender),"Vous n'êtes pas administrateur. ");
        utilisateur[adresseABanir] = false;
        adresseBannie[adresseABanir] = true;
        reputation[adresseABanir] = 0;
        }
}
