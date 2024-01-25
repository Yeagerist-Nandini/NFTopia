import React from 'react'
import { truncate, useGlobalState } from '../store'
import { connectWallet } from '../blockchain';
 
function Header() {
  const [connectedAccount]=useGlobalState('connectedAccount');

  return (
    <div className='w-4/5 md:flex-0.5 flex justify-between items-center py-4 mx-auto'>
        <div className='ml-4 md:flex-[0.5] flex-initial justify-center items-center w-full'>
            <h1 className='font-["Monoton"] font-light text-gray-400 md:text-3xl text-2xl w-32 cursor-pointer'>NFTopia</h1>
        </div>

        <ul className='flex justify-center items-center text-white'>
            <li className='mx-4 cursor-pointer'>Market</li>
            <li className='mx-4 cursor-pointer'>Artists</li>
            <li className='mx-4 cursor-pointer'>Features</li>
            <li className='mx-4 cursor-pointer'>Community</li>
        </ul>

        {connectedAccount ? (
          <button className='shadow-xl shadow-black text-white p-2
          hover:bg-[#af0fff] bg-[#930cd6] rounded-full cursor-pointer'>
            {truncate(connectedAccount, 4, 4, 11)}</button>
        ):(
          <button 
          className='shadow-xl shadow-black text-white p-2
          bg-[#930cd6] hover:bg-[#8617be] rounded-full cursor-pointer'
          onClick={connectWallet}> Connect Wallet</button>
        )}
        
    </div>
  )
}

export default Header