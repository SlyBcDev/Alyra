pragma solidity ^0.5.0;

import "./erc721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";


contract CourseHippique is ERC721{
    
    using SafeMath for uint256;
    
    event newCannasson(uint id,string nom,string famille,string categorie);
    
    
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion de la Création et tunning des cannassons---------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
    
    mapping(uint=>address) ownerOfCannasson;
    mapping(address=>uint) ownerCannassonCount;
    mapping(address=>bool) getFree;

    
    modifier isOwner(uint _idToken) {
        require(ownerOfCannasson[_idToken]==msg.sender,"Vous n'etes pas le propriétaire !");
        _;
    }
    
    struct Cannasson {
        string nom;
        string famille;
        string categorie;
        uint level;
        uint nbreDeCourse;
        uint nbreDeVictoire;
        uint nbreEntrainement;
        uint nbreBlessure;
        uint popularite;
        uint handicap;
        uint nbreDopageAvere;
        uint nbreCorruptionAvere;
        bool estDope;
    }
    Cannasson [] cannassons;
    uint nbreCannassons;
    
    string [10] noms = ["Apocalyptic","Furioso","Blizzard","Booster","Casimir","DirtyDildo", "Lucifer", "Bontempi","Looser","ElChialo"];
    string [10] familles = ["Batard", "HautDescendant", "PureSang", "SemiAne","OnSaitPasTrot","Poneys","Barbie", "Shetland", "ChevalAillés","Licorne"];
    string [10] categories = ["BullDozer", "Diesel", "Ferrari", "Immortel", "Alcolo", "Léger", "Nain", "Géant","3Pates","Véteran"];
    
    function monPremierCannasson() public {
        require(getFree[msg.sender]==false, "Vous avez déjà eu votre cannasson gratuit, il va falloir payer maintenant !!!");
        creationCanasson(msg.sender);
        getFree[msg.sender]=true;
    }
    
    function plusDeCannasson() public payable {
        require(getFree[msg.sender]==true,"Ben tu veux payer alors que t'as le droit à un premier cannasson gratuit ???");
        require(msg.value == 0.001 ether, "Le prix, c'est 0.001 ether !!!");
        creationCanasson(msg.sender);
    }
    
    function creationCanasson(address _address) private {
      nbreCannassons = nbreCannassons.add(1);
      uint id = nbreCannassons;
      cannassons.push(Cannasson(noms[uint(blockhash(block.number-1))%10],familles[uint(blockhash(block.number-2))%10],categories[uint(blockhash(block.number-3))%10],1,0,0,0,0,0,0,0,0,false));
      ownerOfCannasson[id] = _address;
      ownerCannassonCount[_address] = ownerCannassonCount[_address].add(1);
      emit newCannasson(id,noms[uint(blockhash(block.number-1))%10],familles[uint(blockhash(block.number-2))%10],categories[uint(blockhash(block.number-3))%10]);
    }
    
    function changerDeNom(uint _tokenId, string memory _newName) public payable isOwner(_tokenId){
        require (msg.value >= 0.001 ether);
        cannassons[_tokenId].nom = _newName;
    }
    
    function entrainerCannasson(uint _tokenId) public payable isOwner(_tokenId){
        require (msg.value >= 0.001 ether);
        if (msg.value >= 0.001 ether && msg.value < 0.002 ether){
            cannassons[_tokenId].level = cannassons[_tokenId].level.add((uint(blockhash(block.number-1))%3).add(1)); // Un entrainement payé 0.001 à 0.002 peut donner de 1 à 3 pts de level.
        } if (msg.value >= 0.002 ether && msg.value < 0.003 ether){
            cannassons[_tokenId].level = cannassons[_tokenId].level.add((uint(blockhash(block.number-1))%10).add(1).div(2)); // Un entrainement payé 0.002 à 0.003 peut donner de 1 à 5 pts de level.
        } if (msg.value >= 0.003 ether ){
            cannassons[_tokenId].level = cannassons[_tokenId].level.add((uint(blockhash(block.number-1))%10).add(1)); // Un entrainement payé plus de 0.003 peut donner 1 à 10 pts de level.
        } 
        cannassons[_tokenId].nbreEntrainement = cannassons[_tokenId].nbreEntrainement.add(1);
    }
    
    function doperCannasson(uint _tokenId) public payable isOwner(_tokenId){
        require(cannassons[_tokenId].estDope==false, "Hehe, vous ne pouvez pas doper 2 fois votre cannasson entre 2 courses.");
        require (msg.value >= 0.005 ether);
        if (msg.value >= 0.005 ether && msg.value < 0.01 ether){
            cannassons[_tokenId].level = cannassons[_tokenId].level.add((uint(blockhash(block.number-1))%10).add(1)); // Un entrainement payé 0.005 à 0.01 peut donner de 1 à 10 pts de level.
        } if (msg.value >= 0.01 ether && msg.value < 0.03 ether){
            cannassons[_tokenId].level = cannassons[_tokenId].level.add((uint(blockhash(block.number-1))%10).mul(2)); // Un entrainement payé 0.01 à 0.03 peut donner de 2 à 20 pts de level.
        } if (msg.value >= 0.03 ether ){
            cannassons[_tokenId].level = cannassons[_tokenId].level.add((uint(blockhash(block.number-1))%10).mul(3)); // Un entrainement payé plus de 0.03 peut donner 3 à 30 pts de level.
        } 
    }
    
    function transfererCannasson(uint _tokenId, address _to, address _from) public isOwner(_tokenId){
        ownerOfCannasson[_tokenId] = _to;
        ownerCannassonCount[_to] = ownerCannassonCount[_to].add(1);
        ownerCannassonCount[_from] = ownerCannassonCount[_from].sub(1);
        emit Transfer(_from,_to,_tokenId);
    }
    
    //------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------Gestion de la vente aux enchères des cannassons----------------------------------------//
    //------------------------------------------------------------------------------------------------------------------------//
    
    struct enchere {
     address meilleurAcheteur;
     uint256 meilleureOffre;
     uint256 finEnchere;
     uint256 idCannasson;
     address vendeur;
     uint departDeLaVente;
     bool enchereHollandaise;
   }
   
   enchere[] encheres;
   
   mapping(uint=>bool) public estEnVente;
   mapping(address=>bool) private peutEtreRembourse;
   mapping(address=>uint) private montantARembourser;

   
   function proposerALaVente(uint _tokenId, bool _hollandaise, uint _montantHollandais) public isOwner(_tokenId){
       estEnVente[_tokenId] = true;
       encheres.push(enchere(msg.sender,_montantHollandais,block.number + 1000,_tokenId,msg.sender,block.number,_hollandaise)); // msg.sender est initié comme meilleur offrant pour avoir la possibilité de récupérer son objet au cas il n'y aurait pas eu d'offre.
       transfererCannasson(_tokenId,address(this),msg.sender);
   }
   
   function majOffreHollandaise(uint _tokenId) private returns (uint){
       require(encheres[_tokenId].enchereHollandaise==true);
       uint _newPrice;
       uint _nbreBlockPasse = block.number.sub(encheres[_tokenId].departDeLaVente); // On calcule le nombre de bloc passé depuis la mise en enchere de l'objet.
       uint _remise = encheres[_tokenId].meilleureOffre.div(1000); // On calcule 0,1% du montant de l'enchère.
       _newPrice = encheres[_tokenId].meilleureOffre.sub(_nbreBlockPasse.mul(_remise)); // on retire (0.1% X le nombre de bloc passés) de l'enchere.
       return _newPrice; 
       encheres[_tokenId].meilleureOffre= _newPrice; // on met à jour le nouveau prix.
   }
   
   
   function proposerOffre(uint _tokenId) payable public{
       require(estEnVente[_tokenId]==true,"Cet objet n'est pas/plus en vente!");
       require(block.number<encheres[_tokenId].finEnchere,"La vente pour cet objet est terminée"); //On verifie si le bloc actuel n'est pas supperieur au bloc de fin d'enchere

       if(encheres[_tokenId].enchereHollandaise==true){ // Si c'est une enchere Hollandaise
           if(msg.value >= majOffreHollandaise(_tokenId)){ // Si l'offre est suffisante
               transfererCannasson(_tokenId,msg.sender,address(this)); // On transfere directement l'objet
               estEnVente[_tokenId] = false; // On stop l'enchere
           }
       }
       
       // Si ce n'est pas une enchere hollandaise.
       else if(msg.value > encheres[_tokenId].meilleureOffre){ // On verifie que l'offre est suppèrieur à la précédente 
           if(encheres[_tokenId].meilleureOffre>0){ // Si il y'a déjà eu une offre
               peutEtreRembourse[encheres[_tokenId].meilleurAcheteur]=true; // l'address du précédent enchereur peut prétendre à un remboursement
               montantARembourser[encheres[_tokenId].meilleurAcheteur]=encheres[_tokenId].meilleureOffre; // on fixe le montant du remboursement 
           }
           encheres[_tokenId].meilleurAcheteur=msg.sender; // on fixe le nouvel enchereur et la nouyvelle offre
           encheres[_tokenId].meilleureOffre=msg.value;
       }
   }
   
   function demanderRemboursement() public{
       if(peutEtreRembourse[msg.sender]==true){
           msg.sender.transfer(montantARembourser[msg.sender]);
           montantARembourser[msg.sender] = 0;
           peutEtreRembourse[msg.sender]= false;
       }
   }
   
   function reclamerObjet(uint _tokenId) public {
       require( msg.sender == encheres[_tokenId].meilleurAcheteur,"Vous n'etes pas le plus offrant, si vous avez fait une offre, vous pouvez réclamer un remboursement");
       require(block.number>encheres[_tokenId].finEnchere,"L'enchere n'est pas encore terminée, revenez plus tard");
       transfererCannasson(_tokenId,encheres[_tokenId].meilleurAcheteur,address(this)); // S'il n'y a pas eu d'enchere, l'ancien propriétaire peut récupérer son objet.
   }
    
}