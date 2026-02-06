
# FarmLokal Backend Assignment

[![Build Status](https://img.shields.io/badge/status-completed-brightgreen)](https://github.com/vishalsaini79/FarmLokal-Backend)

## About FarmLokal

FarmLokal is a hyperlocal marketplace connecting households directly with local farmers and producers for daily essentials like milk, dairy, vegetables, fruits, and groceries.  
Our mission is to make everyday food **transparent, trustworthy, and local** while improving farmer incomes and reducing dependency on long supply chains.

We work closely with local farmers, doodhwalas, FPOs, and small brands and enable them to sell directly to nearby households through technology, logistics, and on-ground execution. FarmLokal focuses on **freshness, traceability, and quality** while keeping operations asset-light and community-driven.

**App Links:**  
- [Android](https://play.google.com/store/apps/details?id=com.user.farmhonest&hl=en_IN)  
- [iOS](https://apps.apple.com/in/app/farmlokal-milk-discovery-app/id6478612555)  
- [Website](https://www.farmlokal.com)

---

## Tech Stack

- **Node.js** (TypeScript preferred)  
- **MySQL**  
- **Redis** (mandatory for caching and token handling)  
- **Docker** (optional)  

---

## Functional Requirements Implemented

### 1. Authentication (OAuth2)
- Client Credentials flow simulated with Redis caching for token lifecycle
- Automatic token refresh on expiry
- Safe concurrent token requests

### 2. External API Integration
- **API A (Synchronous)**  
  - Timeout handling  
  - Retry with exponential backoff  
- **API B (Webhook / Callback)**  
  - Idempotency check  
  - Safe retries and duplicate event handling  

### 3. Product Listing API (`GET /api/products`)
- Cursor-based pagination  
- Sorting (price, createdAt)  
- Search by name/description  
- Filters by category and price range  
- Redis caching implemented with TTL  
- Simulated dataset of 50 products (scalable for 1M+)

### 4. Reliability & Performance
- Redis caching for high-performance responses  
- Token request deduplication  
- Minimal DB queries per request  
- Error handling and logging centralized  

---

## Setup Instructions

1. Clone the repo:
```bash
git clone https://github.com/vishalsaini79/FarmLokal-Backend.git
cd FarmLokal-Backend
