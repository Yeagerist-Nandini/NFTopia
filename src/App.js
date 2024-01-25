import { useEffect } from 'react';
import Alert from './components/Alert'
import Artworks from './components/Artworks'
import CreateNFT from './components/CreateNFT'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Loading from './components/Loading'
import ShowNFT from './components/ShowNFT'
import Transactions from './components/Transactions'
import UpdateNFT from './components/UpdateNFT'
import { getAllNFTs, isWalletConnected } from './blockchain';


function App() {

  useEffect(()=>{
    const func=async()=>{
      await isWalletConnected().then(()=> console.log("Blockchain Loaded"));
      await getAllNFTs();
    }

    func();
  },[]);

  return (
    // <div className="min-h-screen bg-gradient-to-t from-gray-800 bg-repeat
    // via-[#88930f] to-gray-900 bg-center subpixel-antialiased">
      <div className='min-h-screen gradient-bg'>
      <div>
      <Header/>
      <Hero/>
      </div>
      <Artworks/>
      <Transactions />

      <CreateNFT/>
      <ShowNFT />
      <UpdateNFT/>
      <Footer/>
      <Loading/>
      <Alert/>
      
    </div>
  );
}

export default App;
