# CryptoTracker Full-Stack Application

A comprehensive full-stack solution for monitoring real-time cryptocurrency market data. This project integrates a robust **Java Spring Boot** backend with a high-performance **React** frontend to deliver live price updates for the top market assets.

## 🗄️ Database Schema & Logic
The project uses a relational database model to maintain data integrity and track price changes over time.

### Key Components:
* **Assets Table**: Stores metadata for cryptocurrencies, including full names and symbols.
* **Prices Table**: Stores time-series data, linking live prices and timestamps to specific assets.
* **Automated Data Flow**

## 🛠️ Tech Stack
### Backend & Data
* **Java 17+** with **Spring Boot** framework.
* **Spring Data JPA** (Hibernate) for Object-Relational Mapping.
* **PostgreSQL** for reliable, ACID-compliant data storage.

### Frontend
* **React**
* **React Router DOM**
* **Recharts**
* **Axios** 
* **Custom CSS** for a lightweight, modular, and fully responsive UI.

## 🚀 Key Features
* **Self-Populating Database** 
* **Live Market Dashboard:**
* **Dedicated Coin Pages**
* **Interactive Data Visualization**
* **Filtering & Sorting**
* **Global Crypto News**
* **Enterprise-Ready Architecture**

## 📂 Project Structure
```text
MyCryptoProject/
├── backend/           
│   ├── src/           
│   └── pom.xml        
├── frontend/          
│   ├── src/           
│   └── package.json   
└── README.md          
```

## 🛠️ Installation & Setup
1. Database Configuration
Create a PostgreSQL database named crypto_db.
```
spring.datasource.url=jdbc:postgresql://localhost:5432/crypto_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```
2. Launching the Application
 
Backend: Open the /backend folder in IntelliJ and run BackendApplication.java.

Frontend:
```
cd frontend
npm install
npm run dev
```
