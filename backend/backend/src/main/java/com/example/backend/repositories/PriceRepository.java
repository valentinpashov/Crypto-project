package com.example.backend.repositories;

import com.example.backend.entities.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<PriceHistory, Long> {
}