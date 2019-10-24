pragma solidity ^0.5.0;

import "./ObjetMagique.sol";

contract bazar is objetMagique{
    
    struct enchere {
     address meilleurAcheteur;
     uint256 meilleureOffre;
     uint256 finEnchere;
     uint256 objet;
     address vendeur;
   }
   
   enchere[] encheres;
   
   mapping(uint=>bool) public estEnVente;
   mapping(address=>bool) private peutEtreRembourse;
   mapping(address=>uint) private montantARembourser;
   
   function proposerALaVente(uint _objectId) public {
       require(ObjectOwner[_objectId]== msg.sender,"Vous n'êtes pas proprietaire de cet objet");
       //require(existe(_objectId)==true,"Cet objet n'existe pas"); // pas necessaire puisque si l'objet appartient à msg.sender, c'est qu'il existe.
       estEnVente[_objectId] = true;
       encheres.push(enchere(msg.sender,0,block.number + 1000,_objectId,msg.sender)); // msg.sender est initié comme meilleur offrant pour avoir la possibilité de récupérer son objet au cas il n'y aurait pas eu d'offre.
       transfererObjet(_objectId,address(this));
   }
   
   function proposerOffre(uint _objectId) payable public{
       require(estEnVente[_objectId]==true,"Cet objet n'est pas/plus en vente!");
       require(block.number<encheres[_objectId].finEnchere,"La vente pour cet objet est terminée"); //On verifie si le bloc actuel n'est pas supperieur au bloc de fin d'enchere
       if(msg.value > encheres[_objectId].meilleureOffre){ // On verfie que l'offre est suppèrieur à la précédente 
           if(encheres[_objectId].meilleureOffre>0){ // Si il y'a déjà eu une offre
               peutEtreRembourse[encheres[_objectId].meilleurAcheteur]=true; // l'address du précédent enchereur peut prétendre à un remboursement
               montantARembourser[encheres[_objectId].meilleurAcheteur]=encheres[_objectId].meilleureOffre; // on fixe le montant du remboursement 
           }
           encheres[_objectId].meilleurAcheteur=msg.sender; // on fixe le nouvel enchereur et la nouyvelle offre
           encheres[_objectId].meilleureOffre=msg.value;
       }
   }
   
   function demanderRemboursement() public{
       if(peutEtreRembourse[msg.sender]==true){
           msg.sender.transfer(montantARembourser[msg.sender]);
           montantARembourser[msg.sender] = 0;
           peutEtreRembourse[msg.sender]= false;
       }
   }
   
   function reclamerObjet(uint _objectId) public {
       require( msg.sender == encheres[_objectId].meilleurAcheteur,"Vous n'etes pas le plus offrant, si vous avez fait une offre, vous pouvez réclamer un remboursement");
       require(block.number>encheres[_objectId].finEnchere,"L'enchere n'est pas encore terminée, revenez plus tard");
       transfererObjet(_objectId,encheres[_objectId].meilleurAcheteur); // S'il n'y a pas eu d'enchere, l'ancien propriétaire peut récupérer son objet.
   }
}