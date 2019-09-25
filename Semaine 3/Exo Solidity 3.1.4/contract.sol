contract Assemblee {

  address[] membres;
  Decision[] decisions;

  struct Decision{
  string descriptionDecisions;
  uint votesPour;
  uint votesContre;
  mapping (address => bool) aVote;
  }

  function rejoindre() public{
      membres.push(msg.sender);
  }

  function estMembre(address utilisateur) public view returns (bool){
    for(uint i=0;i<membres.length;i++){
      if(membres[i]==utilisateur){
        return true;
        break;
      }
    }
  }

  function proposerDecision(string memory description) public {
      decisions.push(Decision(description,0,0));  
  }

  function voter(uint indiceVote, uint vote)public {
    if(estMembre(msg.sender)){
      if(vote == 1){
        decisions[indiceVote].votesPour +=1;
      } if(vote == 0){
        decisions[indiceVote].votesContre +=1;
      } 
    }
  }

  function comptabiliser(uint indice) public view returns (int){
  return int(decisions[indice].votesPour) - int(decisions[indice].votesContre);
  }
}