pragma solidity ^0.5.0;
import "./safemath.sol";

contract CanalDePaiement{
    
    using SafeMath for uint256;
    
    enum EtatCanal {VIDE, ACTIF, ENCOURSFERMETURE, FERME}
    
    address partieA;
    address partieB;
    uint montant;
    EtatCanal etat;
    uint blocFermeture; 
    uint dernierNonce;
    uint equilibreA;
    uint equilibreB;
    bool partieAOK;
    bool partieBOK;
    
    constructor(uint _montantDuCanal, address _participantA, address _participantB) public {
        montant = _montantDuCanal;
        partieA = _participantA;
        partieB = _participantB;
        etat = EtatCanal.VIDE;
    }
    
    function financer () public payable{
        require((msg.sender == partieA && partieAOK == false)|| (msg.sender == partieB && partieBOK==false));
        require(msg.value >= montant);
        if(msg.sender == partieA){
            equilibreA = msg.value;
            partieAOK = true;
        }
        if(msg.sender == partieB){
            equilibreB = msg.value;
            partieBOK = true;
        }
        if(partieAOK && partieBOK){
            etat = EtatCanal.ACTIF;
        }
    }
    

    function message(uint nonce, uint _equilibreA, uint _equilibreB) public pure returns(bytes32){
        return keccak256(abi.encodePacked(nonce,_equilibreA,_equilibreB));
    }
    
    
}