pragma solidity ^0.5.0;


contract Pulsation {
    uint public battement;
    string private message;
    
    constructor(string memory tic) public{
        battement = 0;
        message = tic;
    }
    
    function ajouterBattement() public returns(string memory) {
        battement += 1;
        return message;
    }
    
    function combienDeBattement() public view returns(uint){
        return battement;
    }
    
}

contract Pendule{
    Pulsation pulse;
    
    function ajouterUnePulsation () public {
        pulse.ajouterBattement();
    }
}