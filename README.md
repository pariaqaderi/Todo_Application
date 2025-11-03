#  Full Stack Todo App (Django REST + React + TypeScript + Tailwind)

A simple full-stack Todo app built with:
- **Backend:** Python Django + Django REST Framework
- **Frontend:** React + TypeScript + Tailwind CSS
- **Database:** SQLite3

---

##  Features

- Create, update, delete, and toggle todos  
- Auto-reset SQLite auto-increment when all todos are deleted  
- UI using Tailwind CSS  
- REST API backend using Django REST Framework  


---

## ⚙️ Setup Guide

###  1. Backend (Django API)

#### Step 1: Create and activate virtual environment 
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

#### Step 2: Install dependencies

```bash
cd backend
pip install -r requirements.txt
```
#### Step 3: Apply migrations

```bash
python manage.py migrate
```

#### Step 4: Run server
```bash
python manage.py runserver
```

API will be available at:  http://127.0.0.1:8000/api/todos/

###  2. Frontend (React + Vite + TypeScript)

#### Step 1: Install dependencies
```bash
cd frontend
npm install
```

#### Step 2: Run development server
```bash
npm run dev
```

Frontend runs on: http://localhost:5173





