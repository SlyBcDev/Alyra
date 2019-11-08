pragma solidity ^0.5.0;
import "./safemath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/cryptography/ECDSA.sol";

contract CanalDePaiement is ECDSA{
    
    event demandeDeFermeture(bytes32);
    event newMessage(bytes32);
    
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
        require((msg.sender == partieA && partieAOK == false)|| (msg.sender == partieB && partieBOK == false));
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
        bytes32 _message =  keccak256(abi.encodePacked(nonce,_equilibreA,_equilibreB));
        return _message;
        emit newMessage(_message);
    }
    
    function demandeFermeture(uint _nonce, uint _equilibreA, uint _equilibreB)public {
        require(msg.sender==partieA || msg.sender == partieB );
        require(etat == EtatCanal.ACTIF);
        bytes32 _signature = toEthSignedMessageHash(message(_nonce,_equilibreA,_equilibreB));
                
        if(msg.sender==partieA){
            partieASignePourFermeture = true;
            etat = EtatCanal.ENCOURSFERMETURE;
        }
        
        if(msg.sender==partieB){
            message(_nonce,_equilibreA,_equilibreB);
            partieBSignePourFermeture = true;
            etat = EtatCanal.ENCOURSFERMETURE;
        }
        emit demandeDeFermeture(_signature);
    }
    
    function validerFermeture(bytes32 hash, bytes32 _signature) public {
        require(etat == EtatCanal.ENCOURSFERMETURE);
        require(msg.sender == partieA && partieASignePourFermeture == false || msg.sender == partieB && partieBSignePourFermeture == false);
        require(_equilibreA.add(_equilibreB) == montant.mul(2));
  
        if(recover(hash, _signature)== partieA || recover(hash, _signature)== partieA ){
                    
        blocFermeture = block.number;
        etat = EtatCanal.FERME;
        }

    }
    
    
}