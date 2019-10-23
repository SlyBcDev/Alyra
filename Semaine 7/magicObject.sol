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
        string nom;
        uint8 indiceDeRarete;
        uint8 typeObjet;
        uint8 familleObjet;
    }
    
    magicObject [] objects;
    uint nombreObjet = 0;
    
    string [3] rarete = ["COURANT","RARE","DIVIN"];
    string [] typeObjets = ["EPEE","BAGUETTE","CAPE","BOUCLIER","SCEPTRE","CASQUE","ARMURE","BOTTE","ARC","HACHE"];
    string [] familles = ["HOMME","NAIN","ELFE","HOBBIT","AIGLE","NASGUL","ORC","ORUKAI","GOBELIN","MERCENAIRE"];
    
    
    
}