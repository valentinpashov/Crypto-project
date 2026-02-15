import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/api/prices')
        .then(res => {
          const uniqueCoins = [];
          const seenSymbols = new Set();
          const dataReversed = [...res.data].reverse();

          for (const item of dataReversed) {
            const symbol = item.asset.symbol;
            
            // Check if we've already added a coin with this symbol
            if (!seenSymbols.has(symbol)) {
              seenSymbols.add(symbol);
              uniqueCoins.push(item);
            }
            
            if (uniqueCoins.length === 10) break;
          }

          const sortedByOriginalOrder = uniqueCoins.sort((a, b) => a.asset.id - b.asset.id);

          setPrices(sortedByOriginalOrder);
        })
        .catch(err => console.error("Грешка при извличане на данни:", err));
    };

    fetchData();

    // automatic refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        <header>
          <h1 className="header-title">
            CRYPTO<span>TRACKER</span>
          </h1>
          <div className="update-status">
            <span className="pulse-dot"></span>
            Live Updates (10s)
          </div>
        </header>

        <div className="crypto-grid">
          {prices.map((coin) => (
            <div key={coin.id} className="crypto-card">
              <div className="coin-info">
                <div className="coin-icon">
                  {coin.asset.symbol[0]}
                </div>
                <div>
                  <h3 className="coin-name">{coin.asset.name}</h3>
                  <p className="coin-symbol">{coin.asset.symbol}</p>
                </div>
              </div>
              
              <div className="price-section">
                <p className="price-text">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="timestamp">
                  Last Update: {new Date(coin.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;