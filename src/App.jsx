import React, { useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import {ToastContainer, toast } from 'react-toastify'
import { Circles } from 'react-loader-spinner';
import debounce from 'lodash.debounce';

import './App.css'
import CryptoLists from './Components/CryptoLists/CryptoLists';
import SearchBox from './Components/SearchBox/SearchBox';
const App = () => {
  const [typedInput, setTypedInput] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('')
  const [cryptoLists, setCryptoLists] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchData = useCallback( async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      setCryptoLists(response.data)
    } catch (error) {
      toast.error(`Something went wrong: ${error.message}`)
    } finally {
      setLoading(false)
    }

    
  }, [])

  useEffect(() => {
    
    fetchData()
  }, [fetchData])

  const debouncedSetSearchInput = useRef();

  useEffect(() => {
    debouncedSetSearchInput.current = debounce((value) => {
      setSearchInput(value);
    }, 500);
    return () => {
      debouncedSetSearchInput.current.cancel();
    };
  }, []);

  useEffect(() => {
    debouncedSetSearchInput.current(typedInput);
  }, [typedInput]);

  const formatNumber = (num) => {
    return num?.toLocaleString('en-US');
  };
  return (
    <div className='App'>
      <h1>React Crypto App</h1>
      <hr />
      <SearchBox typedInput={typedInput} setTypedInput={setTypedInput} />
       {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        </div>
      ) : (   
        <CryptoLists cryptoLists={cryptoLists} searchInput={searchInput} formatNumber={formatNumber} />
      )}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"      
      />
    </div>
  )
}

export default App