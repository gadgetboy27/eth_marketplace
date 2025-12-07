import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Main from './Main';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json';

const networkId = 1;

const App = () => {
  const [account, setAccount] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketplace] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await loadWeb3();
        await loadBlockchainData();
      } catch (error) {
        console.error('Initialization error:', error);
        setLoading(false);
      }
    };
    init();
  }, []);

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
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
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);
      const network = await provider.getNetwork();
      const networkId = Number(network.chainId);
      const networkData = Marketplace.networks[networkId];

      if (networkData) {
        const marketplace = new ethers.Contract(networkData.address, Marketplace.abi, signer);
        setMarketplace(marketplace);

        const productCount = await marketplace.productCount();
        setProductCount(Number(productCount));

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
      await marketplace.purchaseProduct(id, { value: ethers.parseEther(price.toString()) });
    } catch (error) {
      console.error('Error purchasing product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='content'>
      <Navbar account={account} />
      {loading ? (
        <div id='loader' className='text-center'>
          <p className='text-center'>Loading...</p>
        </div>
      ) : (
        <Main products={products} createProduct={createProduct} purchaseProduct={purchaseProduct} />
      )}
    </div>
  );
};

export default App;
