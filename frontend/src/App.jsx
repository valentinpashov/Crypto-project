import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/prices')
      .then(res => setPrices(res.data))
      .catch(err => console.error("Грешка при връзка с бекенда:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-blue-500 tracking-tighter">
            CRYPTO<span className="text-white">TRACKER</span>
          </h1>
          <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-sm font-bold">
            Live from Port 8080
          </div>
        </header>

        <div className="grid gap-4">
          {prices.map((coin) => (
            <div key={coin.id} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex justify-between items-center hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  {coin.asset.symbol[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{coin.asset.name}</h3>
                  <p className="text-slate-400 text-sm uppercase">{coin.asset.symbol}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-green-400">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-slate-500">
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