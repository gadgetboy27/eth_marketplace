import React, { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Main from './Main';
import Navbar from './Navbar';
import SplashPage from './SplashPage';
import EscrowPage from './EscrowPage';
import Marketplace from '../abis/Marketplace.json';

const networkId = 1;

const App = () => {
  const [currentView, setCurrentView] = useState('splash'); // 'splash', 'marketplace', 'escrow'
  const [account, setAccount] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marketplace, setMarketplace] = useState(null);

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
        setMarketplace(new ethers.Contract(Marketplace.networks[networkId].address, Marketplace.abi, signer));
      } else {
        window.alert('No Ethereum browser detected. Please try Metamask!');
      }
    } catch (error) {
      console.error('Error loading web3:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);
      const networkId = await provider.getNetwork().chainId;
      const networkData = Marketplace.networks[networkId];

      if (networkData) {
        const marketplace = new ethers.Contract(networkData.address, Marketplace.abi, signer);
        setMarketplace(marketplace);

        const productCount = await marketplace.productCount();
        setProductCount(productCount.toNumber());

        const products = [];
        for (let i = 1; i <= productCount; i++) {
          const product = await marketplace.products(i);
          products.push(product);
        }
        setProducts(products);
        setLoading(false);
      } else {
        window.alert('Marketplace contract not detected on this network!');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const createProduct = async (name, price) => {
    try {
      setLoading(true);
      await marketplace.createProduct(name, price);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseProduct = async (id, price) => {
    try {
      setLoading(true);
      await marketplace.purchaseProduct(id, { value: ethers.utils.parseEther(price.toString()) });
    } catch (error) {
      console.error('Error purchasing product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMarketplace = async () => {
    setCurrentView('marketplace');
    setLoading(true);
    try {
      await loadWeb3();
      await loadBlockchainData();
    } catch (error) {
      console.error('Error loading marketplace:', error);
      alert('Failed to connect to MetaMask. Please make sure MetaMask is installed and unlocked.');
      setCurrentView('splash');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEscrow = () => {
    setCurrentView('escrow');
  };

  const handleBackToHome = () => {
    setCurrentView('splash');
  };

  // Render different views based on currentView state
  if (currentView === 'splash') {
    return (
      <div id='content'>
        <SplashPage
          onSelectMarketplace={handleSelectMarketplace}
          onSelectEscrow={handleSelectEscrow}
        />
      </div>
    );
  }

  if (currentView === 'escrow') {
    return (
      <div id='content'>
        <Navbar account={''} />
        <EscrowPage onBack={handleBackToHome} />
      </div>
    );
  }

  // Marketplace view
  return (
    <div id='content'>
      <Navbar account={account} />
      {loading ? (
        <div id='loader' className='text-center'>
          <p className='text-center'>Loading...</p>
        </div>
      ) : (
        <Main
          products={products}
          createProduct={createProduct}
          purchaseProduct={purchaseProduct}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
};

export default App;
