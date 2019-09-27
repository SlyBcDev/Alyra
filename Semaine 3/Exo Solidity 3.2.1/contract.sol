pragma solidity ^0.4.25;

contract CagnottesFestival{
    
 mapping (address => uint) organisateurs;
 address [] listeOrganisateurs;
    
 constructor() public {
     organisateurs[msg.sender] = 100;
     listeOrganisateurs.push(msg.sender);
 }   
    
 function transfererOrga(address orga, uint parts) public {
    require(organisateurs[msg.sender]>parts,"Vous n'avez pas de pouvoir organisationnel" );
    organisateurs[msg.sender] - parts;
    organisateurs[orga] + parts;
    listeOrganisateurs.push(orga);
    
 }  
    
 function estOrga(address orga) public view returns (bool){
     require(organisateurs[orga]>0,"ce n'est pas un organisateur.");
     return true;
 }
     
}