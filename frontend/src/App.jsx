import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NewsTicker from "./components/NewsTicker.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CryptoCard from "./components/CryptoCard.jsx";

function App() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/api/prices')
        .then(res => {
          const groupedData = {};

          res.data.forEach(item => {
            const symbol = item.asset.symbol;
            if (!groupedData[symbol]) {
              groupedData[symbol] = {
                asset: item.asset,
                history: []
              };
            }
            groupedData[symbol].history.push({ 
                price: item.price,
                timestamp: item.timestamp 
            });
          });

          const finalData = Object.values(groupedData)
            .map(coin => ({
              ...coin,
              chartData: coin.history.slice(-20),
              currentPrice: coin.history[coin.history.length - 1].price,
              lastUpdate: coin.history[coin.history.length - 1].timestamp
            }))
            .sort((a, b) => a.asset.id - b.asset.id);

          setPrices(finalData);
        })
        .catch(err => console.error("Backend connection error:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    
    return () => clearInterval(interval);
  }, []);

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
          
          <SearchBar onSearch={setSearchTerm} />

          <div className="update-status"> <span className="pulse-dot"></span> Live Market Updates </div>
        </header>

        <main className="crypto-grid">
          {filteredPrices.length > 0 ? (
            filteredPrices.map((coin) => (
              <CryptoCard key={coin.asset.id} coin={coin} />
            ))
          ) : (
            <div className="no-results"> No assets found matching "{searchTerm}" </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;