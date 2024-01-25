// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTopia is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint;

    address public artist;
    uint public royaltyFee;
    uint public totalTx=0;
    uint public cost = 0.01 ether;
    uint256 private _nextTokenId;
   
    bool public publicMintOpen = true;

    mapping(string=>uint) URIs;
    mapping(uint => address) public nftHolder;
  
    Transaction[] transactions;
    Transaction[] minted;
    
    struct Transaction{
        uint id;
        address owner;
        uint cost;
        string title;
        string description;
        string metadataURI;
        uint timestamp;
    }

    event Sale(
        uint id,
        address owner,
        uint cost,
        string URI,
        uint timestamp
    ); 

    constructor(
        string memory name,
        string memory symbol,
        uint _royaltyFee
    ) ERC721(name,symbol) Ownable(msg.sender)
    {
        artist=msg.sender;
        royaltyFee=_royaltyFee;
    }

    // Modify the mint windows
    function editMintWindows(bool _publicMintOpen) external onlyOwner {
        publicMintOpen = _publicMintOpen;
    }

    function publicMint(
        string memory title,
        string memory description,
        string memory uri,
        uint price
    ) external payable{
        require(publicMintOpen==true,"Public Mint Closed");
        require(msg.value>=cost,"Not Enough Funds");
        require(msg.sender!=owner(),"This is not allowed!");
        require(URIs[uri]==0,"This NFT is already minted");

        uint royalty=(msg.value*royaltyFee)/100;
        payTo(artist,royalty);
        payTo(owner(),(msg.value-royalty));

        uint tokenId=safeMint(uri);

        minted.push(
            Transaction(
                tokenId,
                msg.sender,
                price,
                title,
                description,
                uri,
                block.timestamp
            )
        );

        emit Sale(
            tokenId,
            msg.sender,
            msg.value,
            uri,
            block.timestamp
        );

        nftHolder[tokenId]=msg.sender;
        URIs[uri]=1;
    }

    function safeMint(string memory uri) internal returns(uint){
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    function buyNFT(uint id) external payable{
        // require();
        require(msg.sender!=minted[id].owner,"This is not allowed");
        require(msg.value>=minted[id].cost,"Not enough funds!");

        uint256 royalty = (msg.value * royaltyFee) / 100;
        payTo(artist,royalty);
        payTo(minted[id].owner,minted[id].cost-royalty);

        totalTx++;

         transactions.push(
            Transaction(
                totalTx,
                msg.sender,
                msg.value,
                minted[id].title,
                minted[id].description,
                minted[id].metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            totalTx,
            msg.sender,
            msg.value,
            minted[id].metadataURI,
            block.timestamp
        );

        minted[id].owner=msg.sender;
        
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool) {
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id].owner, "Operation Not Allowed!");

        minted[id].cost = newPrice;
        return true;
    }

    function payTo(address to,uint amount) internal{
        (bool success,) = payable(to).call{value:amount}("");
        require(success,"Payment failed");
    }

    function getAllNFTs() external view returns (Transaction[] memory) {
        return minted;
    }

    function getNFT(uint256 id) external view returns (Transaction memory) {
        return minted[id];
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }


    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721,ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721)
    {
        super._increaseBalance(account, value);
    }
}


// This is to ensure a receiving contract is capable of receiving the token, so it isn't permanently lost.

// There is an explanation in the ERC721.sol that the caller is responsible to
//  confirm that the recipient is capable of receiving ERC721 or else they may be 
//  permanently lost. Usage of {safeTransferFrom} prevents loss, though the caller 
//  must understand this adds an external call which potentially creates a reentrancy vulnerability.

// So, safeTransferFrom is safe to use but reentrancy may happen...
