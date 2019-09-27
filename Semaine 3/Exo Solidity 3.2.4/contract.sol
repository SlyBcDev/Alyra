pragma solidity ^0.5.0;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Cogere {
 
    using SafeMath for uint256;
    mapping (address => uint) public organisateurs;
    address [] listeOrganisateurs;
    string [] listeSponsors;
    uint private depensesTotales;
    uint256 seuilDepenseQuotidienne;
    uint256 montantDepenseToday;
    Depense [] tableauDepense;
    
    struct Depense{
        uint256 montant;
        uint256 date;
    }
    
    constructor() internal {
     organisateurs[msg.sender] = 100;
     listeOrganisateurs.push(msg.sender);
 }   
    
 function transfererOrga(address orga, uint parts) public {
    require(organisateurs[msg.sender]>parts,"Vous n'avez pas de pouvoir organisationnel" );
    require(organisateurs[msg.sender]-parts >=0,"Vous ne pouvez pas donner autant de parts");
    organisateurs[msg.sender] = organisateurs[msg.sender].sub(parts);
    organisateurs[orga] = organisateurs[orga].add(parts);
    listeOrganisateurs.push(orga);
    
 }  
    
 function estOrga(address orga) public view returns (bool){
     return organisateurs[orga]>0 ? true: false;
 }
 
 function comptabiliserDepense(uint montant) private {
     depensesTotales = depensesTotales.add(montant);
 }
 
 function sponsoriser(string memory nom) public payable{
    require(msg.value >= 30 ether, "Le sponsoring minimum est de 30 Ethers.");
    listeSponsors.push(nom);
 }
 
 
}

contract CagnottesFestival is Cogere{
    
 mapping (address => bool) festivaliers;
 uint placesRestantes;
 uint256 dateFestival;
 uint256 dateLiquidation;

 
 constructor(uint256 date,uint nombrePlaceDisponible) public {
     dateFestival = date;
     dateLiquidation = dateFestival + 2 weeks;
     
     placesRestantes = nombrePlaceDisponible;
 }
 
 function placesRestantesAVendre () public view returns(uint) {
     return placesRestantes;
 }
 
 function acheterTicket() public payable{
     require(now >dateLiquidation,"Il est trop tard.");
     require(msg.value >= 500 finney, "La place coute 0.5 Ethers.");
     require(placesRestantes>0,"Il n'y a plus de place disponible.");
     festivaliers[msg.sender] = true;
     placesRestantes = placesRestantes.sub(1);
 }
 
 function payer(address payable destinataire, uint montant) public {
     require(estOrga(msg.sender));
     require(destinataire != address(0));
     require(montant>0);
     require(now < dateLiquidation,"les comptes sont cloturés.");
     
     montantDepenseToday = 0;
     for(uint8 i=0;i<=tableauDepense.length;i++){
        if(tableauDepense[i].date <= now.add(1 days)){
            montantDepenseToday = tableauDepense[i].montant;
        }
     require(montantDepenseToday.add(montant)<= seuilDepenseQuotidienne);
     destinataire.transfer(montant);
     tableauDepense.push(Depense(montant,now));
     }
 }
}