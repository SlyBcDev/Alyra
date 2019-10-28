pragma solidity ^0.5.0;

contract ERC721Simple {
 event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

 function balanceOf(address _owner) public view returns (uint256 _balance);
 function ownerOf(uint256 _tokenId) public view returns (address _owner);
 function exists(uint256 _tokenId) public view returns (bool _exists);

 function transferFrom(address _from, address _to, uint256 _tokenId) public;
}
