pragma solidity ^0.4.25;

contract Assemblee {
    address[] membres;

    struct Decision {
        string description;
        uint votePour;
        uint voteContre;
        mapping (address => bool) aVote;
        uint date;
    }
    Decision[] public decisions;
    
    function rejoindre() public{
        membres.push(msg.sender);
    }
    
    function estMembre(address utilisateur) public view returns(bool) {
        for (uint i=0;i<membres.length; i++){
            if(membres[i] == utilisateur){
                return true;
                break;
            }
        }
    }
    
    function supprimerDecision(uint indiceDecision) public {
        if(int(now) - int(decisions[indiceDecision].date)< 604800)
            delete decisions[indiceDecision];
    }
    
    function proposerDecision(string memory description) public {
        require(estMembre(msg.sender),"Vous n'êtes pas membre, rejoignez nous d'abord.");
            decisions.push(Decision(description,0,0,now));
        }
    
    
    function voter(uint indiceDecision, bool pourContre) public{
        require(estMembre(msg.sender),"Vous n'êtes pas membre, rejoignez nous d'abord.");
        require(decisions[indiceDecision].aVote[msg.sender]!= true,"Vous avez déjà voté");
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
}