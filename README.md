# KiranaAI – AI-Powered Smart Inventory Management System

## AI First Hackathon 2026

KiranaAI is an AI-powered inventory management platform designed for small retail stores (Kirana stores). The application helps store owners efficiently manage inventory, monitor stock levels, and interact with an AI assistant for business-related queries.

---

## Problem Statement

Small retail businesses often rely on manual methods to manage inventory, resulting in stock shortages, overstocking, and inefficient decision-making.

KiranaAI provides an intelligent solution that simplifies inventory management while integrating AI-powered assistance to improve operational efficiency.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication

### Dashboard
- Business Overview
- Inventory Statistics
- Charts and Analytics

### Inventory Management
- Add Products
- Edit Products
- Delete Products
- Search Products
- Stock Monitoring

### AI Assistant
- AI-powered business assistant
- Inventory-related queries
- Store management assistance

### Profile Management
- User Profile
- Account Information

---

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

### Backend
- FastAPI
- Python
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

---

## Project Structure


KiranaAI/
│
├── backend/
│   ├── app/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── database/
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   └── public/
│
└── README.md


---

## Installation

### Clone Repository

bash
git clone https://github.com/yourusername/KiranaAI.git

cd KiranaAI


---

## Backend Setup

bash
cd backend

python -m venv venv


Activate virtual environment

Windows

bash
venv\Scripts\activate


Install dependencies

bash
pip install -r requirements.txt


Run Backend

bash
uvicorn app.main:app --reload


Backend URL


http://127.0.0.1:8000


---

## Frontend Setup

bash
cd frontend

npm install


Run Frontend

bash
npm run dev


Frontend URL


http://localhost:3000


---

## API Endpoints

### Authentication


POST /auth/register
POST /auth/login


---

## Future Enhancements

- AI Demand Forecasting
- Barcode Scanner Integration
- GST Billing
- Sales Prediction
- Supplier Management
- Cloud Deployment
- Mobile Application
- Multi-store Support

---

## Demo

The demo video is available in the Google Drive submission folder.
-https://www.loom.com/share/0a006305b71e40948b7a40f30195343c
---

## Documentation

Project documentation is included in the submission.

---

## GitHub Repository

https://github.com/Kaukab06/KiranaAI

---

## Team Details

*Team Name:* Neobots

### Members

- Kaukab Erum
- Kaushiki Singh
- Komal kumari

---

## License

This project was developed as part of the *AI First Hackathon 2026* organised by *IIT Jammu × Techible*.
