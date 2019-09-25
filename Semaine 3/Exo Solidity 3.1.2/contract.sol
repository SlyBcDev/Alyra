pragma solidity ^0.5.7;

contract Assemblee {
    address[] membres;
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
}