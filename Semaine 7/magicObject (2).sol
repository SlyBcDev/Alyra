pragma solidity ^0.5.0;


import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract ERC721 {
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);

  function balanceOf(address _owner) public view returns (uint256 _balance);
  function ownerOf(uint256 _tokenId) public view returns (address _owner);
  function transfer(address _to, uint256 _tokenId) public;
  function approve(address _to, uint256 _tokenId) public;
  function takeOwnership(uint256 _tokenId) public;
}

contract objetMagique is ERC721{
    
    using SafeMath for uint256;

    mapping(uint => address) ObjectOwner;
    
    struct magicObject {
        uint indiceDeRarete;
        uint typeObjet;
        uint familleObjet;
    }
    
    magicObject [] objects;
    uint nombreObjet = 0;
    
    string [3] rarete = ["COURANTE","RARE","DIVINE"];
    string [3] typeObjets = ["EPEE","BAGUETTE","ARMURE"];
    string [3] familles = ["MAGICIEN","NAIN","ELFE"];
    
    function creerObjet(uint _rarete, uint _type, uint _famille, address _owner) private {
        uint id = nombreObjet;
        objects.push(magicObject(_rarete,_type,_famille));
        ObjectOwner[id] = _owner;
        nombreObjet = nombreObjet.add(1);
    }  
    
    function creuser() public payable {
        require(msg.value == 0.1 ether,"La quantité d'ether n'est pas bonne");
        creerObjet(uint(blockhash(block.number-1)),uint(blockhash(block.number-2)),uint(blockhash(block.number-3)),msg.sender);
    }
    
    function existe(uint _rarete, uint _type, uint _famille) private view returns (bool){
        for (uint i=0; i<nombreObjet; i++){
            if(objects[i].indiceDeRarete == _rarete && objects[i].typeObjet == _type && objects[i].familleObjet == _famille ){
                return true;
            } else {
                return false;
            }
        }
    }
    
    function transfererObjet(uint _id, address _to) public {
        require(ObjectOwner[_id]==msg.sender,"Vous n'êtes pas le proprietaire");
        require(objects[_id].indiceDeRarete != 2,"Cette objet ne peut pas être transféré");
        ObjectOwner[_id] = _to;
    }
    
    function utiliserObjet(uint _id) public{
         require(ObjectOwner[_id]==msg.sender,"Vous n'êtes pas le proprietaire");
         uint random = uint(blockhash(block.number-1))%10;
         if(random == 0){
             transfererObjet(_id,address(0));
         }
    }
}