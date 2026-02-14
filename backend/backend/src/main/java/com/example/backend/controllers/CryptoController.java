package com.example.backend.controllers;

import com.example.backend.entities.PriceHistory;
import com.example.backend.repositories.PriceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prices")
@CrossOrigin(origins = "*")
public class CryptoController {

    private final PriceRepository priceRepository;

    public CryptoController(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @GetMapping
    public List<PriceHistory> getAllPrices() {
        return priceRepository.findAll();
    }

}