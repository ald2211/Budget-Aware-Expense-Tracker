# Budget Aware Expense Tracker

A simple web application to track your expenses, manage budgets, and visualize your spending.

[**Live Demo**](https://budget-aware-expense-tracker-production.up.railway.app/login)

## Features

- **User Authentication** - Register and login securely
- **Expense Tracking** - Add and manage your daily expenses
- **Budget Management** - Set monthly budgets for different categories
- **Categories** - Create custom categories with colors
- **Dashboard** - View spending insights.
- **Reports** - View a bar chart report and a table that shows spending, remaining amount, and whether you are over or within the budget.

## Technologies

**Frontend:** React, TypeScript, Tailwind CSS, TanStack Query  
**Backend:** Node.js, Express, TypeScript  
**Database:** MongoDB  
**Authentication:** JWT

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ald2211/Budget-Aware-Expense-Tracker.git
cd budget-aware-expense-tracker
```

### 2. Install dependencies
```bash
# Backend
npm install

# Frontend
cd frontEnd
npm install
```

### 3. Setup environment variables

Create `.env` file in root folder:
```env
MONGO_URI=your_mongodb_uri
PORT=3000
JWT_SECRET=your_secret_key
VITE_API_URL=http://localhost:3000
FRONTEND_URL = http://localhost:5173
```

### 4. Run the application
```bash
# Backend (from root)
npm start

# Frontend (from frontEnd folder)
cd frontEnd
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login

### Budgets
- `GET /api/v1/budgets` - Get all budgets
- `POST /api/v1/budgets` - Create/update budget
- `DELETE /api/v1/budgets/:id` - Delete budget

### Categories
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Expenses
- `GET /api/v1/expenses` - Get dashboard data
- `POST /api/v1/expenses` - Create expense

## Usage

1. Register and login to your account
2. Create categories for your expenses
3. Set monthly budgets for each category
4. Add your expenses
5. View spending insights on the dashboard
6. View your spending Report

## Contact

**Email:** afnadca2@gmail.com  
**GitHub:** [@ald2211](https://github.com/ald2211)
