import { getGlobalState, setGlobalState, setAlert } from "./store";
import address from './contracts/address.json';
import abi from './contracts/NFTopia.json';

const ethers=require('ethers');
const contractAddress = address.address;
const contractAbi=abi.abi;
const {ethereum} = window;

const connectWallet=async()=>{
    try{
        if(!ethereum) return alert('Please install Metamask');

        const accounts=await ethereum.request({method:'eth_requestAccounts'});
        setGlobalState('connectedAccount',accounts[0]);
    }catch(error){
        reportError(error);
    }
}

const isWalletConnected=async()=>{
    try{
        if(!ethereum) return alert('Please install Metamask');
        
        const accounts=await ethereum.request({method:'eth_accounts'});

        window.ethereum.on('chainChanged',(chainId)=>{
            window.location.reload();
        })

        window.ethereum.on('accountsChanged',async()=>{
            setGlobalState('connectedAccount',accounts[0]);
            await isWalletConnected();
        })

        if(accounts.length){
            setGlobalState('connectedAccount',accounts[0]);
        }
        else{
            alert('Please connect Wallet');
        }
    }catch(error){
        reportError(error);
    }
}

const getEthereumContract=async()=>{
    const connectedAccount=getGlobalState('connectedAccount');

    if(connectedAccount){
        const provider= new ethers.BrowserProvider(ethereum);
        const signer=await provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractAbi,signer);

        return contract;
    }
    else{
        return getGlobalState('contract');
    }
}


const mintNFT=async({title,description,metadataURI,price})=>{
    try{
        if (!ethereum) return alert('Please install Metamask');
        
        const account=getGlobalState('connectedAccount');
        const contract=await getEthereumContract();
        price=ethers.parseEther(price);
        const amount=ethers.parseEther('0.01');

        await contract.publicMint(title,description,metadataURI,price,{from:account,value:amount});

    }catch(error){
        reportError();
    }
}

const getAllNFTs=async()=>{
    try{
        if (!ethereum) return alert('Please install Metamask');
        
        const contract=await getEthereumContract();
        const nfts=await contract.getAllNFTs();
        const transactions=await contract.getAllTransactions();

        setGlobalState('nfts', structuredNfts(nfts))
        // console.log(structuredNfts(nfts));
        setGlobalState('transactions', structuredNfts(transactions))
    }catch(error){
        reportError();
    }
}


const buyNFT=async({id,cost})=>{
    try{
        if (!ethereum) return alert('Please install Metamask');
        
        const contract=await getEthereumContract();
        const buyer=getGlobalState('connectedAccount');

        const amount=cost.toString();
        cost=ethers.parseEther(amount);
        // console.log(cost,id);

        await contract.buyNFT(id,{from:buyer,value:cost});
        return true;
    }catch(error){
        reportError();
    }
}


const updateNFT=async(id,cost)=>{
    try{
        if (!ethereum) return alert('Please install Metamask');
        
        const contract=await getEthereumContract();
        const buyer=getGlobalState('connectedAccount');
        const amount=cost.toString();
        cost=ethers.parseEther(amount);

        await contract.changePrice(id, cost,{ from: buyer });
    }catch(error){
        reportError();
    }
}

const structuredNfts = (nfts) => {
    return nfts
      .map((nft) => ({
        id: parseInt(nft.id,10),
        owner: nft.owner.toLowerCase(),
        cost: parseInt(nft.cost,10)/10**18,
        title: nft.title,
        description: nft.description,
        metadataURI: nft.metadataURI,
        timestamp: new Date(parseInt(nft.timestamp,10)*1000).toLocaleDateString(),
      }))
      .reverse()
  }


  const report = (msg) => {
    setAlert(msg, 'red');
  }
  

export {
    getAllNFTs,
    connectWallet,
    mintNFT,
    buyNFT,
    updateNFT,
    isWalletConnected,
}