import React ,{useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState, setLoading, setAlert} from '../store'
import { mintNFT } from '../blockchain'
import { uploadFileToIPFS} from '../pinata'


function CreateNFT() {
    const [modal] = useGlobalState('modal');
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [fileUrl,setFileUrl] = useState('');

    // const uploadMetadataToIPFS=async()=>{
    //     if(!title || !price || !description) return -1;

    //     try{
    //         const response=await uploadJSONToIPFS(title,description,price,fileUrl);
    //         if(response.success===true){
    //             console.log("Uploaded JSON to Pinata: ", response)
    //             return response.pinataURL;
    //         }
    //     }catch(error){
    //         console.log("error uploading JSON metadata:",error);
    //     }
    // }


    const handleSubmit=async(e)=>{
        e.preventDefault();

        setGlobalState('modal','scale-0');

        try{
            setGlobalState('loading',{show:true,msg:'Uploading IPFS data...'});
            const metadataURI = fileUrl;
            if(metadataURI===-1) return;
            
            setLoading('Initializing transaction...');
            setFileUrl(metadataURI);
            await mintNFT({title,description,metadataURI,price});

            setAlert('Minting completed...','green');
        }catch(error){
            setAlert('Minting failed...','red');
        }

        reset();
    }

    const closeModal=()=>{
        setGlobalState('modal','scale-0');
        reset();
    }

    const changeImage = async (e) => {
        const file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileUrl(response.pinataURL);
                console.log(fileUrl);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    const reset=()=>{
        setTitle('');
        setPrice('');
        setDescription('');
        setFileUrl('');
    }

    return (
        <div className={`flex justify-center items-center bg-black 
       bg-opacity-50 fixed top-0 left-0 w-screen h-screen
       transform transition-transform duration-300 ${modal}`}>
            <div className='bg-[#151c25] shadow-xl shadow-[#ea63de] rounded-xl p-6'>
                <form className='flex flex-col'>
                    
                    <div className='flex justify-between items-center'>
                        <p className="font-semibold text-gray-400">Add NFT</p>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="border-0 bg-transparent focus:outline-none"
                        >
                            <FaTimes className="text-gray-400" />
                        </button>
                    </div>

                    <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  fileUrl ||
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'
                }
              />
            </div>
          </div>

                    <div className='flex justify-between items-center bg-gray-800 rounded-full mt-5'>
                        <input
                            type="file"
                            accept='image/png, image/gif, image/jpeg, image/webp'
                            className='block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#19212c] file:text-gray-400
                            hover:file:bg-[#1d2631]
                            cursor-pointer focus:ring-0 focus:outline-none'
                            onChange={changeImage}
                            required />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5 p-2">
                        <input
                            className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
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

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5 p-2">
                        <textarea
                            className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0"
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>

                    <button
                    type='submit'
                    onClick={handleSubmit}
                    className='hover:text-white mt-5 py-2 px-5 text-[#e32970]'>
                        Mint Now
                    </button>
                </form>

            </div>
        </div>
    )
}

export default CreateNFT