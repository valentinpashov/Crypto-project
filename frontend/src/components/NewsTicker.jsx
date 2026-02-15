import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsTicker.css';

const NewsTicker = () => {
  const [articles, setArticles] = useState([]); 
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        setArticles(response.data.Data.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return null;

  return (
    <>
      <div className="ticker-container">
        <div className="ticker-wrapper">
          {[...articles, ...articles].map((article, index) => (
            <span 
              key={index} 
              className="ticker-item" 
              onClick={() => setSelectedNews(article)} 
            >
              <span className="ticker-icon">⚡</span> {article.title}
            </span>
          ))}
        </div>
      </div>

      {selectedNews && (
        <div className="news-modal-overlay" onClick={() => setSelectedNews(null)}>
          <div className="news-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedNews(null)}>&times;</button>
            <img src={selectedNews.imageurl} alt="news" className="modal-image" />
            <div className="modal-body">
              <span className="modal-source">{selectedNews.source_info.name}</span>
              <h2>{selectedNews.title}</h2>
              <p>{selectedNews.body}</p>
              <a href={selectedNews.url} target="_blank" rel="noreferrer" className="read-more-link">
                Read Full Article on {selectedNews.source_info.name} →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsTicker;