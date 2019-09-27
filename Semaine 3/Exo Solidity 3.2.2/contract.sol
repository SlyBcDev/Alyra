pragma solidity ^0.4.25;

contract Cogere {
    
    mapping (address => uint) public organisateurs;
    address [] listeOrganisateurs;
    string [] listeSponsors;
    uint private depensesTotales;
    
    constructor() internal {
     organisateurs[msg.sender] = 100;
     listeOrganisateurs.push(msg.sender);
 }   
    
 function transfererOrga(address orga, uint parts) public {
    require(organisateurs[msg.sender]>parts,"Vous n'avez pas de pouvoir organisationnel" );
    require(organisateurs[msg.sender]-parts >=0,"Vous ne pouvez pas donner autant de parts");
    organisateurs[msg.sender] - parts;
    organisateurs[orga] + parts;
    listeOrganisateurs.push(orga);
    
 }  
    
 function estOrga(address orga) public view returns (bool){
     return organisateurs[orga]>0 ? true: false;
 }
 
 function comptabiliserDepense(uint montant) private {
     depensesTotales += montant;
 }
 
 function sponsoriser(string memory nom) public payable{
    require(msg.value >= 30 ether, "Le sponsoring minimum est de 30 Ethers.");
    listeSponsors.push(nom);
 }
}

contract CagnottesFestival is Cogere{
    
 mapping (address => bool) festivaliers;
 uint placesRestantes;
 
 constructor(uint nombrePlaceDisponible) public {
     placesRestantes = nombrePlaceDisponible;
 }
 
 function placesRestantesAVendre () public view returns(uint) {
     return placesRestantes;
 }
 
 function acheterTicket() public payable{
     require(msg.value >= 500 finney, "La place coute 0.5 Ethers.");
     require(placesRestantes>0,"Il n'y a plus de place disponible.");
     festivaliers[msg.sender] = true;
     placesRestantes--;
 }
 
 function payer(address destinataire, uint montant) public {
     require(estOrga(msg.sender));
     require(destinataire != address(0));
     require(montant>0);
     destinataire.transfer(montant);
 }
     
}