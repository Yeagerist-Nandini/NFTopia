import React, { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import { useGlobalState,truncate } from '../store'

function Transactions() {
  const [transactions] = useGlobalState('transactions');
  const [end,setEnd] = useState(3);
  const [count]= useState(3);
  const [collection,setCollection]=useState([]);

  const getCollection=()=>{
    return transactions.slice(0,end);
  }

  useEffect(()=>{
    setCollection(getCollection())
  },[transactions,end])

  return (
    <div className='bg-[#151c25] bg-opacity-50'>
      <div className='w-4/5 py-10 mx-auto'>
        <h4 className='text-3xl font-bold uppercase text-gradient'>
          Latest Transactions
        </h4>

      <div className='flex flex-col mt-4'>

        {collection.map((tx)=>(
            <div className='flex justify-between items-center border border-[#7d13a1]
             text-gray-400 w-full shadow-xl shadow-black rounded-md bg-gray-800 my-2 p-3'>
              <div className="rounded-md shadow-sm shadow-[#b90ef2] p-2">
                <BiTransfer/>
              </div>

              <div>
                <h4 className='text-sm'>{tx.title} Transfered</h4>
                  <small className='flex flex-row justify-start items-center'>
                    <span  className="mr-1">Received by</span>
                    
                    <a href="#" className="text-pink-500 mr-2">
                      {truncate(tx.owner, 4, 4, 11)}
                    </a>

                    <a  href="#">
                    <MdOpenInNew />
                    </a>
                  </small>
              </div>

              <p className='text-sm font-medium'>{tx.cost} ETH</p>
            </div>
        ))}
      </div>


      {collection.length > 0 && transactions.length > collection.length ? (
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

export default Transactions