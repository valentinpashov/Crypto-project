import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/prices')
      .then(res => setPrices(res.data))
      .catch(err => console.error("Грешка:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        <header>
          <h1 className="header-title">
            CRYPTO<span>TRACKER</span>
          </h1>
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
                  {new Date(coin.timestamp).toLocaleTimeString()}
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