pragma solidity ^0.5.0;

contract Deezmine {
    
    // J'ai pris le parti pris de ne pas utiliser le standard ERC721 que je ne trouve pas adapté à ce cas de figure.
    
    address ownerOfContract;
    
    event newInstrument(address _id,uint _date, string _name, string _serialNumber); 
    event newOwner(address _id, uint date, string _ownerNickName);
    event hasBeenStolenOrLost(address _id, uint date, string _message);
    event hasBeenRecover(address _id, uint date, string _message);
    event warningAlarm(address _id, uint date, string _location);
    event historyEvent(address _id,uint _date, string _details);
    
    
    // Caractéristique d'un instrument. Celui-ci est représenté pzr une adresse 
    
    mapping (address => string) brand;
    mapping (address => string) model;
    mapping (address => string) instrumentType;
    mapping (address => string) name;
    mapping (address => address) owner;
    mapping (address => string) ownerMail;
    mapping (address => string) ownerNickName;
    mapping (address => uint) birthDateOfInstrument;
    mapping (address => string) serialNumber;
    
    
    mapping (address => bool) exist;
    mapping (address => bool) isStolenOrLost; 
    
    
 
 
    
    //-------------------------------------------------------------------------//
    //----------------------Accés au infos-------------------------------------//
    //-------------------------------------------------------------------------//
    
    function getBrand(address _id) public view returns(string memory){
        return brand[_id];
    } 
    
    function getModel(address _id) public view returns(string memory){
        return model[_id];
    } 
    
    function getType(address _id) public view returns(string memory){
        return instrumentType[_id];
    }
    
    function getName(address _id) public view returns(string memory){
        return name[_id];
    } 
    
    
    function getOwnerAddress(address _id) public view returns(address){
        return owner[_id];
    } 
    
    function getOwnerNickName(address _id) public view returns(string memory){
        return ownerNickName[_id];
    } 
    
    function getBirthday(address _id) public view returns(uint){
        return birthDateOfInstrument[_id];
    } 
    
    function getSerialNumber(address _id) public view returns(string memory){
        return serialNumber[_id];
    } 
    
    function getExist(address _id) public view returns(bool){
        return exist[_id];
    }
 
    function getIsStolen(address _id) public view returns(bool){
        return isStolenOrLost[_id];
    }
 
    
    
    //-------------------------------------------------------------------------//
    //--------------Enregistrement et transfer de l'instrument-----------------//
    //-------------------------------------------------------------------------//
    
    // Enregistrement de l'instrument sur la blockchain par le fabricant.
    // Une app JS créerra un jeu de clé privée et adresse, l'adresse sera inscrite sur le tag NFC de l'instrument et la clé privée sera inscrite sur un chip NFC format carte de crédit.
    function checkInInstrument(string memory _brand, string memory _model, string memory _instrumentType, string memory _name, string memory _serialNumber, address _id) public { 
        require(exist[_id] == false);
        exist[_id] = true;
        
        brand[_id] = _brand;
        model[_id] = _model;
        instrumentType[_id] = _instrumentType;
        name[_id] = _name; // name est une concaténation de marque-model-type( ex: Fender-Stratocaster-Guitar).
        
        birthDateOfInstrument[_id] = now;
        serialNumber[_id] = _serialNumber;
        
        emit newInstrument(_id,now, _name, _serialNumber );
    }
   
    // La prise de possession de l'instrument sera faite via l'appli mobile.
    // Le "client" scan le ship NFC de l'instrument , puis scan la clé privée du ship NFC format carte de crédit.
    // Le proprio pourra s'il le souhaite inscrire un email.
    // Il est possible d'utiliser cette fonction pour transférer l'instrument à un new Owner. 
    function takeOwnership(string memory _ownerMail, string memory _ownerNickName, address _ownerAdrress) public {
        require(exist[msg.sender]==true);
        // Il sera possible, si le nouveau proprio possède un wallet, d'inscrire l'adresse de son wallet comme propriétaire de l'instru.
        // option facultative 
        if(_ownerAdrress != address(0x0)){
            owner[msg.sender] = _ownerAdrress;
        } else {
            owner[msg.sender] = msg.sender;
        }
 
        ownerMail[msg.sender] = _ownerMail;
        ownerNickName[msg.sender] = _ownerNickName;
        emit newOwner(msg.sender,now,_ownerNickName);
    }
    
     modifier isOwner(address _id){
        require(owner[_id] == msg.sender);
        _;
    }
    
    // Méthode de transfer de particulier à particulier en cas de perte du ship NFC format carte de crédit.
    // Le owner doit connaitre l'address du futur owner, et avoir déjà inscrit son adresse comme propriétaire de l'instru.
    // le new owner doit créer un wallet auparavent.
    function transfer(address _id, address _futurOwner) public isOwner(_id){
        owner[_id] = _futurOwner;
        emit newOwner(_id,now, "NoName");
    }
    
    // fonction equivalente à takeOwnership dans le cas ou la clé NFC ait été perdu.
    function changeOwnerName(address _id, string memory _newOwnerNickName, string memory _newOwnerMail) public isOwner(_id){
        
        ownerNickName[_id] = _newOwnerNickName;
        ownerMail[_id] = _newOwnerMail;
        emit newOwner(msg.sender,now,_newOwnerNickName);
    }
  
    
    //-------------------------------------------------------------------------//
    //---------------------Déclaration de vol ou de perte----------------------//
    //-------------------------------------------------------------------------//
    
    // Un owner peut déclarer son intrument volé ou perdu. 
    function declareStolenOrLost(address _id, string memory _message) public isOwner(_id){
        isStolenOrLost[_id] = true;
        emit hasBeenStolenOrLost(_id,now,_message);
    }
    
    // Le owner est le seul à pouvoir pretendre avoir retrouvé son instrument. 
    function declareRecover(address _id, string memory _message) public isOwner(_id){
        isStolenOrLost[_id] = false;
        emit hasBeenRecover(_id, now, _message);
    }
    
    // L'applis React, chargera au démmarrage un array des instruments declarés volés ou perdus
    // en scannant l'instrument, elle va comparer l'id avec le array, et lancer la fonction d'alerte.
     function stolenOrLostTest(address _id , string memory _location) public returns(string memory){
        if(isStolenOrLost[_id] == true){
             return("warning !!!");
             emit warningAlarm(_id, now, _location);
        }
    }
  
    
    //-------------------------------------------------------------------------//
    //----------------------Historique de l'instrument-------------------------//
    //-------------------------------------------------------------------------//
    
    // 2 possibilités: avec l'adresse de l'owner, avec la clé privée de l'instru.
    function createHistoryEvent (address _id , string memory _details) public isOwner(_id){
        emit historyEvent(_id,now,_details);
    }
    
     function createHistoryEventWithKey (string memory _details) public {
        emit historyEvent(msg.sender,now,_details);
    }
    
}