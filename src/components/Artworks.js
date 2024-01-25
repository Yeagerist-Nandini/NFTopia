import React, { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'
 
function Artworks() {
  const [nfts]=useGlobalState('nfts');
  const [end,setEnd] = useState(4);
  const [count] = useState(4);
  const [collection,setCollection]= useState([]);

  const getCollection=()=>{
    console.log(nfts);
    return nfts.slice(0,end);
  }

  useEffect(()=>{
    setCollection(getCollection());
  },[nfts,end])

  return (
    <div>
      <div className='py-10 mx-auto w-4/5'>
        <h4 className='text-white text-3xl font-bold uppercase text-gradient'>Latest Artworks</h4>

        <div className='flex flex-wrap justify-center items-center mt-4'>
          {collection.map((nft,i)=>(
            <Card key={i} nft={nft}/>
          ))}
        </div>


        {collection.length > 0 && nfts.length > collection.length ? (
          <div className="text-center my-5">
            <button
              className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f]
            rounded-full cursor-pointer p-2"
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          </div>
        ) : null}

      </div>
    </div>
  )
}

const Card=({nft})=>{
  const setNFT=()=>{
    setGlobalState('nft',nft);
    // console.log(nft);
    setGlobalState('showModal','scale-100');
  }

  return(
    <div className='w-64  bg-gray-800 shadow-xl shadow-black rounded-lg overflow-hidden m-3 p-3'>
      <img
      src={nft?.metadataURI}
      alt={nft?.title} 
      className='h-60 w-full object-cover  shadow-lg shadow-black rounded-md mb-3'
      />

      <h4 className='text-white font-semibold'>{nft?.title}</h4>
      <p  className="text-gray-400 text-xs my-1 limit">{nft?.description}</p>

      <div className='flex justify-between items-center mt-3 text-white'>
        <div className='flex flex-col'>
        <small>Current Price</small>
        <p  className="text-sm font-semibold">{nft?.cost} ETH</p>
        </div>

        <button
        className='text-[#af0fff] hover:text-white text-sm cursor-pointer'
        onClick={setNFT}>
          View Details</button>
      </div>
    </div>
  )
}

export default Artworks