pragma solidity ^0.5.0;

contract CanalDePaiement{
    enum EtatCanal {VIDE, ACTIF, ENCOURSFERMETURE, FERME}
    
    address partieA;
    address partieB;
    uint montant;
    EtatCanal etat;
    uint blocFermeture; 
    uint dernierNonce;
    uint equilibreA;
    uint equilibreB;
    
    constructor(uint _montantDuCanal, address _participantA, address _participantB) public {
        montant = _montantDuCanal;
        partieA = _participantA;
        partieB = _participantB;
        etat = EtatCanal.VIDE;
    }
    
}