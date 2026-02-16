import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const CryptoChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div style={{ height: 50, color: '#475569', fontSize: '10px' }}>Loading chart...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <YAxis hide domain={['auto', 'auto']} />
        
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{ 
                  backgroundColor: '#1e293b', 
                  padding: '2px 5px', 
                  border: '1px solid #3b82f6',
                  fontSize: '10px',
                  borderRadius: '4px' 
                }}>
                  ${payload[0].value.toFixed(2)}
                </div>
              );
            }
            return null;
          }}
        />

        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#4ade80" 
          strokeWidth={2} 
          dot={false} 
          isAnimationActive={true} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;