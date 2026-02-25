import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NewsTicker from "./components/NewsTicker.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CryptoCard from "./components/CryptoCard.jsx";
import Footer from "./components/Footer.jsx";
import CoinDetails from "./components/CoinDetails.jsx";

function App() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('cryptoFavorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const toggleFavorite = (symbol) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(symbol)
        ? prevFavorites.filter(fav => fav !== symbol)
        : [...prevFavorites, symbol];
      localStorage.setItem('cryptoFavorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/api/prices')
        .then(res => {
          const groupedData = {};
          res.data.forEach(item => {
            const symbol = item.asset.symbol;
            if (!groupedData[symbol]) {
              groupedData[symbol] = { asset: item.asset, history: [] };
            }
            groupedData[symbol].history.push({ price: item.price, timestamp: item.timestamp });
          });

          const finalData = Object.values(groupedData)
            .map(coin => ({
              ...coin,
              chartData: coin.history.slice(-50), 
              currentPrice: coin.history[coin.history.length - 1].price,
              lastUpdate: coin.history[coin.history.length - 1].timestamp
            }));
          setPrices(finalData);
        })
        .catch(err => console.error("Backend error:", err));
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const sortedAndFilteredPrices = prices
    .filter(coin => 
      coin.asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aFav = favorites.includes(a.asset.symbol);
      const bFav = favorites.includes(b.asset.symbol);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      if (sortOrder === "price_desc") return b.currentPrice - a.currentPrice;
      if (sortOrder === "price_asc") return a.currentPrice - b.currentPrice;
      return a.asset.id - b.asset.id;
    });

  return (
    <BrowserRouter>
      <div className="dashboard-container">
        <NewsTicker />
        
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={
              <>
                <header>
                  <h1 className="header-title"> CRYPTO<span>TRACKER</span> </h1>
                  <SearchBar onSearch={setSearchTerm} onSortChange={setSortOrder} currentSort={sortOrder} />
                  <div className="update-status"> <span className="pulse-dot"></span> Live Market Updates </div>
                </header>

                <main className="crypto-grid">
                  {sortedAndFilteredPrices.length > 0 ? (
                    sortedAndFilteredPrices.map((coin) => (
                      <CryptoCard 
                        key={coin.asset.id} 
                        coin={coin} 
                        isFavorite={favorites.includes(coin.asset.symbol)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))
                  ) : (
                    <div className="no-results"> No assets found matching "{searchTerm}" </div>
                  )}
                </main>
              </>
            } />

            <Route path="/coin/:symbol" element={<CoinDetails prices={prices} />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;