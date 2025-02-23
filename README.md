# Customer Engagement Dashboard

A **Customer Engagement Dashboard** built using the **MERN** stack, designed to visualize customer interactions, track engagement metrics, and provide actionable insights.

## 🚀 Features  
- 📊 **Engagement Metrics** – Track Active Users (Daily, Weekly, Monthly) and Engagement Scores.  
- 🔮 **Churn Prediction** – Identify users likely to churn using mock AI predictions.  
- 📑 **User Activity Table** – View user details, last login, engagement scores, and retention categories.  
- 🎯 **AI Insights** – Get recommendations to reduce churn and highlight key feature usage.  
- 🔍 **Filters & Search** – Filter data by date range, engagement score, and retention category.  
- 📱 **Responsive UI** – Optimized for both desktop and mobile.  

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## 📂 Folder Structure

```bash
📦 Customer-Engagement-Dashboard
├── 📂 client            # Frontend application
│   ├── 📂 public        
│   ├── 📂 src           
│   │   ├── 📂 components            # Reusable UI components
│   │   │   ├── 📂 SkeletonLoading  
│   │   │   ├── AllInsights.jsx
│   │   │   ├── ChurnPrediction.jsx
│   │   │   ├── UserTable.jsx
│   │   ├── 📂 pages
│   │   │   ├── Dashboard.jsx
│   │   ├── 📂 services
│   │   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx 
│   ├── 📄 package.json
│   ├── 📄 .env
│   └── 📄 README.md
|
├── 📂 server
│   ├── 📂 src                 # Source folder containing all backend logic
│   │   ├── 📂 controllers     # Route controllers
│   │   │   ├── healthcheck.controller.js
│   │   │   ├── user.controller.js
│   │   ├── 📂 db             # Database connection
│   │   │   ├── index.js
│   │   ├── 📂 models         # Database models
│   │   │   ├── engagement.model.js
│   │   │   ├── user.model.js
│   │   ├── 📂 routes         # API routes
│   │   │   ├── healthcheck.routes.js
│   │   │   ├── user.routes.js
│   │   ├── 📂 test           # Generate Mock Data
│   │   │   ├── generateTestData.js
│   │   ├── 📂 utils          # Utility functions
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── errorHandler.js
│   │   ├── app.js
│   │   ├── constants.js
│   │   ├── index.js
│   ├── 📄 package.json  
│   ├── 📄 README.md
│   ├── 📄 .env
│   ├── 📄 vercel.json   
├── 📄 .gitignore        
└── 📄 README.md  

```

## 🚀 Setup This Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pritambose0/Customer-Engagement-Dashboard.git
cd Customer-Engagement-Dashboard
```

### 2️⃣ Set Up the Backend
Navigate to the `server` directory and install the necessary dependencies:

```bash
cd server
npm install
```
Create a .env file in the server directory with the following content:
```bash
CORS_ORIGIN = http://localhost:5173
MONGODB_URI = your mongo url
PORT = 8000
```
Start the backend server:
```bash
npm run dev
```


### 3️⃣ Set up the Frontend
Open a new terminal, navigate to the `client` directory, and install dependencies:

```bash
cd client
npm install
```
Create a .env file in the client directory with the following content:
```bash
VITE_API_URL=http://localhost:8000
```
Start the frontend server:
```bash
npm run dev
```

Visit http://localhost:3000 in your browser to view the application.



