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
   
   function proposerALaVente(uint _objectId) public {
       require(ObjectOwner[_objectId]== msg.sender,"Vous n'êtes pas proprietaire de cet objet");
       //require(existe(_objectId)==true,"Cet objet n'existe pas"); // pas necessaire puisque si l'objet appartient à msg.sender, c'est qu'il existe.
       estEnVente[_objectId] = true;
       encheres.push(enchere(address(0),0,block.number + 1000,_objectId,msg.sender));
   }
}