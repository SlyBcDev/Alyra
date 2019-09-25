pragma solidity ^0.5.7;

contract Assemblee {

  address[] membres;
  string[] descriptionDecisions;
  uint[] votesPour;
  uint[] votesContre;

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
    if(estMembre(msg.sender)){
      descriptionDecisions.push(description);
      votesPour.push(0);
      votesContre.push(0);
    }
  }

  function voter(uint indiceVote, uint vote)public {
    if(estMembre(msg.sender)){
      if(vote == 1){
        votesPour[indiceVote] +=1;
      } if(vote == 0){
        votesPour[indiceContre] +=1;
      }
    }
  }

  function comptabiliser(uint indice) public view returns (int){
    return int(votesPour[indice]) - int(votesContre[indice]);
  }
}
