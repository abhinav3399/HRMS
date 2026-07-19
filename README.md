# HRMS Application

A professional Human Resources Management System built with Flask (Python) and Vanilla JavaScript.

## Features
- JWT Authentication
- Employee CRUD Operations
- Event Calendar
- Settings & Integrations Management
- Docker & CI/CD Ready
- PostgreSQL Support

## Quick Start (Local Development)

### 1. Environment Setup
```bash
cp .env.example .env
# Edit .env with your local configurations
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Server
```bash
flask run
```

### 4. Open the App
Visit `http://localhost:5000` in your web browser.

## Docker Deployment
```bash
docker build -t hrms-app .
docker run -p 5000:5000 --env-file .env hrms-app
```

## Project Structure
- `src/` - Backend Python application (Flask)
- `frontend/` - Static frontend assets (HTML, CSS, JS)
- `tests/` - Unit and integration tests
- `docker/` - Docker deployment configurations
