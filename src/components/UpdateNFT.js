import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setAlert, setGlobalState, setLoading, useGlobalState } from '../store'
import { updateNFT } from '../blockchain';

function UpdateNFT() {
    const [modal] = useGlobalState('updateModal');
    const [nft] = useGlobalState('nft');
    const [price, setPrice] = useState('');

    const closeModal = () => {
        setGlobalState('updateModal', 'scale-0');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (!price || price <= 0) return;

        setGlobalState('modal', 'scale-0');
        setGlobalState('loading', { show: true, msg: 'Initiating price update...' })

        try {
            setLoading('Price updating...');
            setGlobalState('updateModal', 'scale-0');

            await updateNFT(nft.id,price);
            setAlert('Price updated...', 'green');
            // window.location.reload();
        } catch (error) {
            setAlert('Update failed...', 'red');
        }
        setPrice(price,'');
    }

    return (
        <div className={`flex justify-center items-center bg-black 
    bg-opacity-50 fixed top-0 left-0 w-screen h-screen
    transform transition-transform duration-300 ${modal}`}>
            <div className='bg-[#151c25] shadow-xl shadow-[#af0fff] rounded-xl p-6'>
                <form className='flex flex-col'>

                    <div className='flex justify-between items-center'>
                        <p className="font-semibold text-gray-400">{nft?.title}</p>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes className="text-gray-400" />
                        </button>
                    </div>

                    <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                        <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                            <img
                                alt={nft?.title}
                                src={nft?.metadataURI}
                                className="h-full w-full object-cover cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5 p-2">
                        <input
                            className="block w-full text-sm
                         text-slate-500 bg-transparent border-0
                         focus:outline-none focus:ring-0"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="price"
                            placeholder="Price (ETH)"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className="w-full text-white text-md bg-[#af0fff]
                        py-2 px-5 rounded-full border border-transparent
                       hover:bg-transparent hover:text-[#af0fff]
                       hover:border hover:border-[#af0fff] mt-5">
                        Update Now
                    </button>
                </form>

            </div>
        </div>
    )
}

export default UpdateNFT