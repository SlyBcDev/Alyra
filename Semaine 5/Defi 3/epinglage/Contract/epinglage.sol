pragma solidity ^0.5.0;

contract epinglage{
    
    event Epingler (string _id);
    
    function payerStockage(string memory _id) public payable {
        require(msg.value>= 0.1 ether);
        emit Epingler(_id);
    }
}