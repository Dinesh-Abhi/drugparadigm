# 💊 **Drug Paradigm**

**A modern full-stack application to streamline drug-related data and services**  
Built with React, NestJS, MySQL, and secure authentication via SuperTokens & Google OAuth.

---

## 🧱 **Tech Stack**

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| **Frontend** | [Vite](https://vitejs.dev/) + [React](https://react.dev/)      |
| **Backend**  | [NestJS](https://nestjs.com/) + [Express](https://expressjs.com/) |
| **Auth**     | [SuperTokens](https://supertokens.com/), Google OAuth |
| **Database** | [MySQL](https://www.mysql.com/)                 |

---

## 🌍 **Project Structure**

```
drugparadigm/
├── frontend/   # Frontend (Vite + React)
├── backend/    # Backend (NestJS)
└── README.md
```

---

## ⚙️ **Environment Variables**

### 🔸 Frontend (`frontend/.env`)

```env
VITE_APP_API_PORT=3001
VITE_APP_API_URL=http://{yourip}:3001

VITE_APP_WEBSITE_PORT=3000
VITE_APP_WEBSITE_URL=http://{yourip}:3000
```

> ⚠️ Replace `{yourip}` with your local IP (e.g., `192.168.0.100`)

---

### 🔹 Backend (`backend/.env`)

```env
APP_PORT=3001
APP_NAME=Drug Paradigm

# Server
API_PORT=3001
API_URL=http://{yourip}:3001

# Client
WEBSITE_PORT=3000
APP_WEBSITE_URL=http://{yourip}:3000

# SuperTokens
SUPERTOKENS_CONNECTION_URI=https://try.supertokens.com

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=**********************
GOOGLE_CLIENT_SECRET=***************************

# Database
DB_TYPE=mysql
DB_HOST=localhost
DB_DATABASE=drugparadigm
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=*******   # Your DB password
DB_SYNC=true

# Environment
APP_ENV=development

# Swagger Auth
SWAGGER_USERNAME=drugParadigm
SWAGGER_PASSWORD=drugParadigm321$
```

---

## 🚀 **Getting Started**

### ✅ Prerequisites

- Node.js v16+
- MySQL
- Yarn or npm
- [SuperTokens Account](https://supertokens.com/)
- Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)

---

### 🔄 Clone the Repository

```bash
git clone https://github.com/yourusername/drugparadigm.git
cd drugparadigm
```

---

### 📦 Install Dependencies

#### Frontend

```bash
cd frontend
npm install
# or
yarn
```

#### Backend

```bash
cd backend
npm install
# or
yarn
```

---

### 🛠 Setup Environment

- Create `.env` files in both `frontend/` and `backend/` using the variables provided above.
- Be sure to replace `{yourip}` with your actual local IP.

---

### ▶️ Run the App

#### Start Frontend (Vite)

```bash
cd frontend
npm run dev
```

#### Start Backend (NestJS)

```bash
cd backend
npm run start:dev
```

---

## 🔐 **Authentication**

- Secure login with **Google OAuth** powered by **SuperTokens**
- **Swagger** API docs are protected using basic HTTP auth.

> **Swagger Credentials**  
> **👤 Username:** `drugParadigm`  
> **🔑 Password:** `drugParadigm321$`

---

## 📘 **API Documentation**

Once the backend is running, access the docs here:

```
http://localhost:3001/docs
```

Use the Swagger credentials above for access.

---

## 🧾 Developer Notes

- Make sure your MySQL server is running.
- Ensure the `drugparadigm` DB exists.
- Set `DB_SYNC=true` to sync models/tables automatically during dev.
- Always update your `.env` with your **local IP** so other devices can connect during local testing.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributions Welcome!

Got improvements or ideas?  
Feel free to:

- 🍴 Fork the repo
- 🔧 Make some changes
- 🚀 Submit a pull request
---
