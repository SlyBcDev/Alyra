pragma solidity ^0.5.0;

contract Deezmine {
    
    // J'ai pris le parti pris de ne pas utiliser le standard ERC721 que je ne trouve pas adapté à ce cas de figure.
    
    address ownerOfContract;
    
    event newInstrument(bytes32 _id,uint _date, string _name); 
    event newOwner(bytes32 _id, uint date, address _owner);
    event hasBeenStolenOrLost(bytes32 _id, uint date, string _message, string _geolocation);
    event hasBeenRecover(bytes32 _id, uint date);
    event warningAlarm(bytes32 _id, uint date, string _localisation);
    event historyEvent(bytes32 _id,uint _date, string _details);
    
    constructor () public{
         ownerOfContract = (msg.sender);
    }
    
    // Caractéristique d'un instrument.
    struct myInstrument{
        string brand;
        string name;
        string instrumentType;
        string owner;
        address ownerDeezmineAddress;
        uint birthDateOfInstrument;
        string serialNumber;
        bytes32 hashKey; // Clé obtenue à partir du tag NFC de l'instrument et d'un tag NFC qui servira de clé de cryptage. Le tout crypté en keccak256 pour avoir un bytes32.
    }
    
    
    // Prendre un bytes32 comme ID permet de conserver un certain anonymat en évitant aux curieux d'utiliser l'application pour savoir à qui appartient l'objet 1, 2 ,3 ...
    mapping (bytes32 => myInstrument) idInstrument;
    mapping (bytes32 => bool) exist;
    mapping (bytes32 => bool) isStolenOrLost; 
    
 
 
    
    //-------------------------------------------------------------------------//
    //----------------------Accés au infos-------------------------------------//
    //-------------------------------------------------------------------------//
    
    function getBrand(bytes32 _id) public view returns(string memory){
        return idInstrument[_id].brand;
    } 
    
    function getName(bytes32 _id) public view returns(string memory){
        return idInstrument[_id].name;
    } 
    
    function getType(bytes32 _id) public view returns(string memory){
        return idInstrument[_id].instrumentType;
    } 
    
    function getOwnerName(bytes32 _id) public view returns(string memory){
        return idInstrument[_id].owner;
    } 
    
    function getOwnerAddress(bytes32 _id) public view returns(address){
        return idInstrument[_id].ownerDeezmineAddress;
    } 
    
    function getBirthday(bytes32 _id) public view returns(uint){
        return idInstrument[_id].birthDateOfInstrument;
    } 
    
    function getSerialNumber(bytes32 _id) public view returns(string memory){
        return idInstrument[_id].serialNumber;
    } 
 
 
    
    
    //-------------------------------------------------------------------------//
    //--------------Enregistrement et transfer de l'instrument-----------------//
    //-------------------------------------------------------------------------//
    
    // Enregistrement de l'instrument sur la blockchain par le fabricant.
    // Une app JS utilisera le tag NFC de l'instrument pour le crypter (chiffre de césar) avec une clé NFC (format carte de crédit).
    // L'ensemble sera hashé avec Keccak256 pour obtenir un bytes32.
    function checkInInstrument(string memory _brand, string memory _name, string memory _instrumentType, string memory _serialNumber, bytes32 _hashKey, bytes32 _id) public { // Le HashKey sera calculé hors blockchain à l'aide du tag NFC de l'instrument et de celui de la carte Id de l'instrument.
        require(exist[_id] == false);
        exist[_id] = true;
        // Le owner initié, est l'address du smart contract.
        idInstrument[_id] = myInstrument(_brand,_name,_instrumentType,"",address(this),now,_serialNumber,_hashKey);
        emit newInstrument(_id,now, _name);
    }
   
    // La prise de possession de l'instrument sera faite via l'appli mobile.
    // Le "client" scan le ship NFC de l'instrument , puis scan la clé de cryptage dispo sur le ship NFC format carte de crédit.
    // L'appli hash l'ensemble, compare avec la hashKey du struct et si elles sont identiques, msg.sender devient owner.
    // Il est possible d'utiliser cette fonction pour transférer l'instrument à un new Owner. Cela nécessite de conserver le ship NFC format carte de crédit. 
    function takeOwnership(bytes32 _hashKey, bytes32 _id) public {
        require(_hashKey == idInstrument[_id].hashKey);
        idInstrument[_id].ownerDeezmineAddress = msg.sender;
        emit newOwner(_id,now,msg.sender);
    }
    
    modifier isOwner(bytes32 _id){
        require(idInstrument[_id].ownerDeezmineAddress == msg.sender);
        _;
    }
    
    // Méthode de transfer de particulier à particulier en cas de perte du ship NFC format carte de crédit.
    // Le owner doit connaitre l'address du futur owner.
    // le new owner doit créer un wallet auparavent.
    function transfer(bytes32 _id, address _futurOwner) public isOwner(_id){
        idInstrument[_id].ownerDeezmineAddress = _futurOwner;
        emit newOwner(_id,now, _futurOwner);
    }
    
    function changeOwnerName(bytes32 _id, string memory _newName) public isOwner(_id){
        idInstrument[_id].owner = _newName;
    }
  
    
    //-------------------------------------------------------------------------//
    //---------------------Déclaration de vol ou de perte----------------------//
    //-------------------------------------------------------------------------//
    
    // Un owner peut déclarer son intrument volé ou perdu. 
    function declareStolenOrLost(bytes32 _id, string memory _message, string memory _geolocation) public isOwner(_id){
        isStolenOrLost[_id] = true;
        emit hasBeenStolenOrLost(_id,now,_message,_geolocation);
    }
    
    // Le owner est le seul à pouvoir pretendre avoir retrouvé son instrument. 
    function declareRecover(bytes32 _id) public isOwner(_id){
        isStolenOrLost[_id] = false;
        emit hasBeenRecover(_id, now);
    }
    
    // L'applis React, chargera au démmarrage un array des instruments declarés volés ou perdus
    // en scannant l'instrument, elle va comparer l'id avec le array, et lancer la fonction d'alerte.
     function stolenOrLostTest(bytes32 _id , string memory _localisation) public returns(string memory){
        if(isStolenOrLost[_id] == true){
             return("warning !!!");
             emit warningAlarm(_id, now, _localisation);
        }
    }
  
    
    //-------------------------------------------------------------------------//
    //----------------------Histoire de l'instrument---------------------------//
    //-------------------------------------------------------------------------//
    
    function createHistoryEvent (bytes32 _id , string memory _details) public isOwner(_id){
        emit historyEvent(_id,now,_details);
    }
    
}