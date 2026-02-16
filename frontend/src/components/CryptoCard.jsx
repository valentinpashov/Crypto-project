import React from 'react';
import CryptoChart from './CryptoChart';
import './CryptoCard.css';

const CryptoCard = ({ coin }) => {
  return (
    <div className="crypto-card">
      <div className="coin-info">
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