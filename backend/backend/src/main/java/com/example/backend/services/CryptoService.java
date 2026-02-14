package com.example.backend.services;

import com.example.backend.entities.Asset;
import com.example.backend.entities.PriceHistory;
import com.example.backend.repositories.AssetRepository;
import com.example.backend.repositories.PriceRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class CryptoService {
    private final AssetRepository assetRepository;
    private final PriceRepository priceRepository;
    private final RestTemplate restTemplate;

    public CryptoService(AssetRepository assetRepository, PriceRepository priceRepository, RestTemplate restTemplate) {
        this.assetRepository = assetRepository;
        this.priceRepository = priceRepository;
        this.restTemplate = restTemplate;
    }

    // 300000 = 5 minutes
    @Scheduled(fixedRate = 300000)
    public void fetchPrices() {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

        try {
            List<Map<String, Object>> response = restTemplate.getForObject(url, List.class);

            if (response != null) {
                for (Map<String, Object> coin : response) {
                    String symbol = (String) coin.get("symbol");
                    String name = (String) coin.get("name");

                    // Price can be Double or Integer, because we use Number
                    Number priceNumber = (Number) coin.get("current_price");
                    Double price = priceNumber.doubleValue();

                    updatePrice(symbol, name, price);
                }
                System.out.println("Top 10 crypto prices updated successfully!");
            }
        } catch (Exception e) {
            System.out.println("Error fetching prices: " + e.getMessage());
        }
    }

    private void updatePrice(String symbol, String name, Double price) {
        Asset asset = assetRepository.findAll().stream()
                .filter(a -> a.getSymbol().equalsIgnoreCase(symbol))
                .findFirst()
                .orElseGet(() -> {
                    Asset newAsset = new Asset();
                    newAsset.setSymbol(symbol.toUpperCase());
                    newAsset.setName(name);
                    return assetRepository.save(newAsset);
                });

        PriceHistory history = new PriceHistory();
        history.setAsset(asset);
        history.setPrice(BigDecimal.valueOf(price));
        priceRepository.save(history);
    }
}