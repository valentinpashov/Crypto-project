import React from 'react';
import CryptoChart from './CryptoChart';
import './CryptoCard.css';

const CryptoCard = ({ coin, isFavorite, onToggleFavorite }) => {
  return (
    <div className="crypto-card">
      <div className="coin-info">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={onToggleFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg viewBox="0 0 24 24" fill={isFavorite ? "#f59e0b" : "none"} stroke={isFavorite ? "#f59e0b" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>

        <div className="coin-icon">{coin.asset.symbol[0]}</div>
        <div>
          <h3 className="coin-name">{coin.asset.name}</h3>
          <p className="coin-symbol">{coin.asset.symbol}</p>
        </div>
      </div>

      <div className="chart-wrapper">
        <CryptoChart data={coin.chartData} />
      </div>
      
      <div className="price-section">
        <p className="price-text"> ${coin.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} </p>
        <p className="timestamp"> {new Date(coin.timestamp).toLocaleTimeString()} </p>
      </div>
    </div>
  );
};

export default CryptoCard;