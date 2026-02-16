import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsTicker from './components/NewsTicker';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/api/prices')
        .then(res => {
          const uniqueCoins = [];
          const seenSymbols = new Set();
          const dataReversed = [...res.data].reverse();

          for (const item of dataReversed) {
            const symbol = item.asset.symbol;

            if (!seenSymbols.has(symbol)) {
              seenSymbols.add(symbol);
              uniqueCoins.push(item);
            }

            if (uniqueCoins.length === 10) break;
          }

          const sortedByOriginalOrder = uniqueCoins.sort((a, b) => a.asset.id - b.asset.id);

          setPrices(sortedByOriginalOrder);
        })
        .catch(err => console.error("Error:", err));
    };

    fetchData();

    // automatic refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  // Filter logic 
  const filteredPrices = prices.filter(coin => 
    coin.asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <NewsTicker />
      
      <div className="content-wrapper">
        <header>
          <h1 className="header-title"> CRYPTO<span>TRACKER</span> </h1>
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by name or symbol (e.g. BTC)..." 
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="update-status"> <span className="pulse-dot"></span> Live Market Updates </div>
        </header>

        <div className="crypto-grid">
          {filteredPrices.length > 0 ? (
            filteredPrices.map((coin) => (
              <div key={coin.id} className="crypto-card">
                <div className="coin-info">
                  <div className="coin-icon">{coin.asset.symbol[0]}</div>
                  <div>
                    <h3 className="coin-name">{coin.asset.name}</h3>
                    <p className="coin-symbol">{coin.asset.symbol}</p>
                  </div>
                </div>
                
                <div className="price-section">
                  <p className="price-text"> ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} </p>
                  <p className="timestamp"> Last Update: {new Date(coin.timestamp).toLocaleTimeString()} </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No cryptocurrencies found matching "{searchTerm}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;