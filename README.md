# 📦 Inventory Items Manager

A full-stack **Inventory Management System** built with **React** (Frontend) and **ASP.NET Core Web API** (Backend). Demonstrates clean REST API design, CRUD operations, real-time stock status tracking, and a responsive UI — all with a clear separation of concerns between client and server.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![.NET](https://img.shields.io/badge/.NET-6%2B-512BD4?logo=dotnet)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Status](https://img.shields.io/badge/status-active-brightgreen)

---

## 🌟 Features

- ➕ **Add** new inventory items with name, SKU, and quantity
- 📋 **View** all inventory items in a clean, sortable table
- ✏️ **Update** existing item details inline
- ❌ **Delete** items with confirmation
- 📊 **Automatic stock status** based on quantity:

| Status | Condition | Indicator |
|--------|-----------|-----------|
| Out of Stock | Quantity = 0 | 🔴 |
| Low Stock | Quantity < 10 | 🟡 |
| In Stock | Quantity ≥ 10 | 🟢 |

- ⚡ **Error handling** for all API failures with user-friendly messages
- 📱 **Responsive design** — works on desktop and mobile

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 (Hooks) | UI & state management |
| Axios | HTTP client for API calls |
| CSS (Custom) | Styling & responsive layout |

### Backend
| Technology | Purpose |
|------------|---------|
| ASP.NET Core Web API (.NET 6+) | REST API server |
| In-Memory Storage | Data persistence (dev mode) |
| Swagger / OpenAPI | API documentation & testing |

---

## 📁 Project Structure

```
inventory-items-manager/
├── backend/
│   ├── Controllers/
│   │   └── ItemsController.cs      # API endpoints
│   ├── Models/
│   │   └── InventoryItem.cs        # Item data model
│   ├── Services/
│   │   └── InventoryService.cs     # Business logic
│   ├── Program.cs                  # App entry point & DI setup
│   └── backend.csproj
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.jsx         # Add / Edit form
│   │   │   ├── ItemList.jsx         # Table view
│   │   │   └── StockBadge.jsx       # Status indicator
│   │   ├── services/
│   │   │   └── api.js               # Axios API calls
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [.NET SDK 6+](https://dotnet.microsoft.com/download)
- [Git](https://git-scm.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/deepyamanmondal/inventory-items-manager.git
cd inventory-items-manager
```

---

### 2️⃣ Run the Backend

```bash
cd backend
dotnet restore
dotnet run
```

| | URL |
|---|---|
| **API Base** | `http://localhost:5252` |
| **Swagger UI** | `http://localhost:5252/swagger` |

---

### 3️⃣ Run the Frontend

```bash
cd frontend
npm install
npm start
```

| | URL |
|---|---|
| **App** | `http://localhost:3000` |

> ✅ Make sure the backend is running before starting the frontend.

---

## 🔗 API Reference

Base URL: `http://localhost:5252/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/items` | Get all inventory items | — |
| `POST` | `/items` | Add a new item | `{ name, sku, quantity }` |
| `PUT` | `/items/{sku}` | Update an existing item | `{ name, quantity }` |
| `DELETE` | `/items/{sku}` | Delete an item by SKU | — |

### Sample Request & Response

**POST** `/api/items`
```json
// Request
{
  "name": "Wireless Mouse",
  "sku": "WM-001",
  "quantity": 25
}

// Response 201 Created
{
  "sku": "WM-001",
  "name": "Wireless Mouse",
  "quantity": 25,
  "status": "In Stock"
}
```

---

## ⚠️ Assumptions & Limitations

- Data is stored **in-memory** — all data resets on server restart
- **No authentication** or authorization implemented
- **SKU** is treated as the unique identifier for each item
- CORS is configured for `localhost:3000` only

---

## 🚀 Future Improvements

- [ ] Integrate a persistent database (SQL Server / PostgreSQL via Entity Framework Core)
- [ ] Add JWT-based authentication & role management
- [ ] Implement search, filter, and sort functionality
- [ ] Add pagination for large inventories
- [ ] Write unit tests (xUnit for backend, Jest/React Testing Library for frontend)
- [ ] Dockerise both services with `docker-compose`
- [ ] Deploy to Azure App Service / Vercel

---

## 🧠 Key Learnings

- Designing and consuming **REST APIs** with ASP.NET Core
- Managing component state in React using **Hooks** (`useState`, `useEffect`)
- Handling async API calls and errors with **Axios**
- Clean **separation of concerns** across frontend and backend
- Building **responsive, accessible UI** with custom CSS

---

## 👨‍💻 Author

**Deepyaman Mondal**

[![Email](https://img.shields.io/badge/Email-deepyamanmondal7%40gmail.com-D14836?logo=gmail)](mailto:deepyamanmondal7@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-deepyamanmondal-0A66C2?logo=linkedin)](https://www.linkedin.com/in/deepyaman-mondal-8592a3265)
[![GitHub](https://img.shields.io/badge/GitHub-deepyamanmondal-181717?logo=github)](https://github.com/DevRony04)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-4CAF50?logo=vercel)](https://rony-portfolio-site.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
