import React from 'react'
import Identicon from 'react-hooks-identicons'
import { FaTimes } from 'react-icons/fa'
import { setAlert, setGlobalState, useGlobalState, truncate } from '../store'
import { buyNFT } from '../blockchain'

function ShowNFT() {
  const [showModal] = useGlobalState('showModal');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [nft] = useGlobalState('nft');

  const onChangePrice = () => {
    setGlobalState('showModal', 'scale-0');
    setGlobalState('updateModal', 'scale-100');
  }

  const handleNFTPurchase = async () => {
    setGlobalState('showModal', 'scale-0')
    setGlobalState('loading', {
      show: true,
      msg: 'Initializing NFT transfer...',
    })

    try {
      await buyNFT(nft)
      
      setAlert('Transfer completed...', 'green')
      // window.location.reload()
    } catch (error) {
      console.log('Error transfering NFT: ', error)
      setAlert('Purchase failed...', 'red')
    }
  }



  return (
    <div className={`fixed top-0 left-0 w-full h-screen flex justify-center 
      items-center bg-black bg-opacity-50 transform
      transition-transform duration-300 ${showModal}`}>
      <div className='flex flex-col bg-[#151c25] shadow-xl shadow-[#ea63de] rounded-xl p-6 w-4/5 md:w-3/6'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-gray-400'>Buy NFT</p>
          <button
            type="button"
            onClick={() => setGlobalState('showModal', 'scale-0')}>
            <FaTimes className="text-gray-400" />
          </button>
        </div>
 
        <div className='flex justify-center items-center rounded-xl mt-5
               shrink-0 overflow-hidden h-40 w-40"'>
          <img
            src={nft?.metadataURI}
            alt={nft?.title}
            className='h-full w-full object-cover cursor-pointer'
          />

        </div>

        <div className='flex flex-col justify-start mt-5'>
          <h4 className="text-white font-semibold">{nft?.title}</h4>
          <p className="text-gray-400 text-xs my-1">{nft?.description}</p>

          <div className='text-white flex justify-between items-center mt-3'>
            <div className='flex justify-start items-center'>
              <Identicon
                size={50}
                string={nft?.owner}
                className='h-10 w-10 rounded-full object-contain mr-3'
              />

              <div className='flex flex-col'>
                <small className="text-white font-bold">@owner</small>
                <small className="text-[#af0fff] font-semibold"> {nft?.owner ? truncate(nft.owner, 4, 4, 11) : '...'}</small>
              </div>
            </div>

            <div className="flex flex-col">
              <small className="text-xs">Current Price</small>
              <p className="text-sm font-semibold">{nft?.cost} ETH</p>
            </div>
          </div>
        </div>


        {connectedAccount === nft?.owner ? (
          <button
            className="w-full text-white text-md bg-[#af0fff]
                py-2 px-5 rounded-full border border-transparent
               hover:bg-transparent hover:text-[#af0fff]
               hover:border hover:border-[#af0fff] mt-5"
            onClick={onChangePrice}
          >
            Change Price
          </button>
        ) : (
          <button
            className="w-full text-white text-md bg-[#af0fff]
                 py-2 px-5 rounded-full border border-transparent
                hover:bg-transparent hover:text-[#af0fff]
                hover:border hover:border-[#af0fff] mt-5"
            onClick={handleNFTPurchase}
          >
            Purchase Now
          </button>
        )}
      </div>
    </div>
  )
}

export default ShowNFT
