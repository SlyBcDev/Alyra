pragma solidity ^0.5.0;

contract Pulsation {
    uint public battement;
    
    constructor() public{
        battement = 0;
    }
    
    function ajouterBattement() public {
        battement += 1;
    }
    
    function combienDeBattement() public view returns(uint){
        return battement;
    }
    
}