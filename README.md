
# AssetX Backend

AssetX is the RWA Launchpad, enabling compliant tokenization, trading, and investment in real-world assets (RWAs).  
This repository powers the **backend services** for AssetX ecosystem.

To see the detailed functionality documentation, please visit the [AssetX Docs](https://docs.google.com/document/d/1p2uinBX4mU_k44AfnWcFjAXly7GI5CZvJKVJ3tusEYo/edit?usp=sharing).

---

## 📌 Overview

Backend responsibilities:
- **API Layer** – Secure endpoints for frontend <> blockchain interaction
- **Custodian Mock** – Simulated off-chain asset receipts for RWAs
- **Compliance Integration** – KYC/AML checks via Integra
- **Analytics & Indexing** – Fetch & serve transaction data via The Graph
- **Launchpad/Investment Flows** – Manage project creation, pool data, and investor dashboards

---

## ⚙️ Tech Stack

- Node.js / Express.js
- Ethers.js

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/vrajparikh01/AssetX-backend.git
cd AssetX-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment

Create a .env file with the variables defined in the `.env.example` file which includes Pinata API keys, contract addresses, and other sensitive information.

### 4️⃣ Run Server
```bash
npm run dev
```

## 🧩 API Endpoints
The backend exposes various API endpoints for interacting with the AssetX platform. Below are some of the key endpoints:
- `/v1/contract/rwa-token` - Call RWA token contract functions
- `/v1/contract/sto`: Creating Wrapped ERC20 tokens and other getters
- `/v1/contract/uniswap`: Uniswap V2 function calls for pool creation, adding liquidity and swaps.
- `/v1/contract/launchpad`: Launchpad contract functions for project creation, investment, and fund withdrawal.
- `/v1/pinata`: Pinata IPFS upload and fetch endpoints

## Pinata Integration

The backend integrates with Pinata for IPFS storage. It uses the Pinata APIs to upload and retrieve files. 

Main functions:
1. Upload files to IPFS via Pinata
2. Retrieve files from IPFS via Pinata gateway
3. Manage Pinata API keys and configurations
For more details, refer to the `src/services/pinataService.js` file.