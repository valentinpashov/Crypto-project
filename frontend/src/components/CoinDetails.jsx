import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './CoinDetails.css';

const CoinDetails = ({ prices }) => {
  const { symbol } = useParams(); 
  
  const coin = prices.find(p => p.asset.symbol === symbol);

  if (!coin) {
    return <div className="details-container">Loading or Coin Not Found...</div>;
  }

  const mockStats = {
    marketCap: coin.currentPrice * 18000000, 
    volume: coin.currentPrice * 450000,
    supply: 18500000,
    high24h: coin.currentPrice * 1.05,
    low24h: coin.currentPrice * 0.95
  };

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="details-container">
      <Link to="/" className="back-btn">← Back to Dashboard</Link>

      <div className="coin-header">
        <div className="large-icon">{coin.asset.symbol[0]}</div>
        <div className="coin-title">
          <h1>{coin.asset.name} <span className="coin-tag">{coin.asset.symbol}</span></h1>
          <p style={{color: '#94a3b8', marginTop: '5px'}}>Real-time market analysis</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Current Price</div>
          <div className="stat-value" style={{color: '#22d3ee'}}>{formatCurrency(coin.currentPrice)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Market Cap</div>
          <div className="stat-value">{formatCurrency(mockStats.marketCap)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">24h Volume</div>
          <div className="stat-value">{formatCurrency(mockStats.volume)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Circulating Supply</div>
          <div className="stat-value">{mockStats.supply.toLocaleString()} {coin.asset.symbol}</div>
        </div>
      </div>

      <div className="main-chart-wrapper">
        <h3 style={{marginBottom: '20px', color: '#cbd5e1'}}>Price Movement (Live)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={coin.chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="timestamp" hide />
            <YAxis domain={['auto', 'auto']} orientation="right" tick={{fill: '#64748b'}} />
            <Tooltip 
              contentStyle={{backgroundColor: '#0f172a', borderColor: '#3b82f6', color: 'white'}}
              itemStyle={{color: '#4ade80'}}
              labelFormatter={() => ''}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinDetails;