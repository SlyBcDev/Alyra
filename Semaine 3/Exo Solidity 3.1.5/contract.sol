pragma solidity ^0.4.25;

contract Assemblee {
    Membre[] membres;
    address[] admin;
    
    struct Membre{
        address adressMembre;
        uint blame;
    }
    
    struct Administrateur{
        address adressAdmin;
    }

    struct Decision {
        string description;
        uint votePour;
        uint voteContre;
        mapping (address => bool) aVote;
        uint date;
        bool open;
    }
    Decision[] public decisions;
    
    string public nomdAssemblee;
    
    constructor(string nom) public {
        nomdAssemblee = nom;
        membres.push(Membre(msg.sender,0));
        admin.push(msg.sender); 
    }
 
     function rejoindre() public{
        membres.push(Membre(msg.sender,0));
    }
    
    function nommerAdmin (address futurAdmin) public {
        require(estAdmin(msg.sender),"Vous n'êtes pas admin");
        admin.push(futurAdmin);
    }
    
    function estAdmin(address utilisateur) public view returns(bool) {
        for (uint i=0;i<admin.length; i++){
            if(admin[i] == utilisateur){
                return true;
                break;
            }
        }
    }
    
    function demissionner() public{
        require(estAdmin(msg.sender),"Vous n'êtes pas admin");
        require(admin.length>1, "Vous devez rajouter un admin avant.");
        for(uint i=0; i<admin.length; i++){
            if(admin[i] == msg.sender){
            delete admin[i];
            }
        }
    }
    
    function estMembre(address utilisateur) public view returns(bool) {
        for (uint i=0;i<membres.length; i++){
            if(membres[i].adressMembre == utilisateur){
                return true;
                break;
            }
        }
    }
    
    function proposerDecision(string memory description) public {
        require(estMembre(msg.sender),"Vous n'êtes pas membre, rejoignez nous d'abord.");
            decisions.push(Decision(description,0,0,now,true));
        }
    
    function fermerDecision(uint indiceDecision) public {
        require(estAdmin(msg.sender),"Vous n'avez accés à cette option.");
        decisions[indiceDecision].open = false;
    }
    
    function supprimerDecision(uint indiceDecision) public {
        if(int(now) - int(decisions[indiceDecision].date)< 604800)
            delete decisions[indiceDecision];
    }
    
    function voter(uint indiceDecision, bool pourContre) public{
        require(int(now) - int(decisions[indiceDecision].date)< 604800,"Ce vote a été fermé.");
        require(estMembre(msg.sender),"Vous n'êtes pas membre, rejoignez nous d'abord.");
        require(decisions[indiceDecision].aVote[msg.sender]!= true,"Vous avez déjà voté");
        require(decisions[indiceDecision].open == true, "Il n'est plus possible de voter pour cette decision.");
        if(pourContre==true){
            decisions[indiceDecision].votePour ++;
        }
        else{
            decisions[indiceDecision].voteContre ++;
        }
        decisions[indiceDecision].aVote[msg.sender] = true;
    }
    
    function comptabiliser(uint indiceDecision) public view returns (int) {
        return int(decisions[indiceDecision].votePour) - int(decisions[indiceDecision].voteContre);
    }
    
    function blamerUtilisateur(address utilisateur) public {
        require(estAdmin(msg.sender),"Vous n'êtes pas administrateur.");
        require(estMembre(utilisateur),"Ce n'est pas l'adresse d'un utilisateur.");
        for (uint i=0;i<membres.length; i++){
            if(membres[i].adressMembre == utilisateur){
                membres[i].blame ++;
                if(membres[i].blame ==2){
                    delete membres[i];
                }
            }
        }
    }
}