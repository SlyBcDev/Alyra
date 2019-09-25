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

  function voter(uint vote, bool sens)public {
    if(estMembre(msg.sender)){
      if(vote == descriptionDecisions[vote]){
        if(sens){
          votesPour[vote] ++;
        }
      }
    }
  }

  function comptabiliser(uint indice) public view returns (int){
    int resultat;
    resultat = (votesPour[indice] - votesContre[indice]);
    return resultat;
  }
}