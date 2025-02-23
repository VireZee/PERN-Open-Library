# **📚 PERN Open Library**
A lightweight **Open Library System** powered by the **PERN Stack** (**PostgreSQL, Express.js, React, Node.js**), fetching book data from the **Open Library API**.

---

## **🌟 Key Features**
- 📖 **Browse & Search Books** (via Open Library API)
- 🔐 **JWT-Based Authentication**
- ⚡ **State Management with Redux Toolkit**
- 🔗 **Internal GraphQL Implementation**

---

## **📋 Prerequisites**
Before setting up the project, ensure you have the following installed:
- 🐘 **PostgreSQL** → [Download](https://www.postgresql.org/download/)
- 🟢 **Node.js** → [Download](https://nodejs.org/en/download)
- 📦  **pnpm** → Enable with:
```sh
corepack enable pnpm
```  

---

## **📂 Clone & Setup**
###  1️⃣ Clone the Repository 🔄
```sh
git clone https://github.com/VireZee/PERN-Open-Library.git
cd PERN-Open-Library
```

### 2️⃣ Install Dependencies 🔧
#### 🌐 Frontend 🎨
```sh
cd client
pnpm i
```

#### 🖥️ Backend ⚙️
```sh
cd ../server
pnpm i
```

###  3️⃣ Configure Environment Variables 🔑
Copy the `.env.example` files to `.env` in both the **frontend** and **backend** directories.
Each environment file must be placed in its respective service directory:  
- Frontend → `client/.env`
- Backend → `server/src/configs/.env`

#### 🌐 Frontend 🎨 
Navigate to the project root and create `.env` inside the `client/` directory:
```sh
cd ../

# Linux/macOS
cp client/.env.example client/.env

# Windows (cmd)
copy client\.env.example client\.env

# Windows (PowerShell)
Copy-Item client/.env.example client/.env
```

Modify .env with:
```sh
VITE_DOMAIN=localhost
VITE_SERVER_PORT=3001
```

#### 🖥️ Backend ⚙️
Create `.env` inside `server/src/configs/`:
```sh
# Linux/macOS
cp server/src/configs/.env.example server/src/configs/.env

# Windows (cmd)
copy server\src\configs\.env.example server\src\configs\.env

# Windows (PowerShell)
Copy-Item server/src/configs/.env.example server/src/configs/.env 
```

Modify `.env` with your configuration
```env
DB_HOST=localhost   # Use "db" when running inside Docker
DB_PORT=5432
DB_USER=<your_database_user>
DB_PASS=<your_database_password>
DB_NAME=<your_database_name>
DOMAIN=localhost
PORT=3001
CLIENT_PORT=3000
SECRET_KEY=<your_secret_key>
PEPPER=<your_pepper>
NODE_ENV=development    # or "production"
```
> [!Note]
> **Replace values inside `<...>` with your actual database credentials.**

---

## **🚀 Running the Application**
### **🚧 Development Mode**
#### 🌐 Start Frontend 🎨 (React)
```sh
cd client
pnpm run dev
```

#### 🖥️ Start Backend ⚙️ (Express)
```sh
cd ../server
pnpm run dev
```

### **🏭 Production Mode**
Before running the application in production, make sure to modify the `.env` file inside server/src/configs/:
```sh
NODE_ENV=production
```

#### 🌐 Frontend 🎨
```sh
cd ../client
pnpm run build
pnpm serve -s dist -l 3000
```

#### 🖥️ Backend ⚙️
```sh
cd ../server
pnpm run build
pnpm production
```

---

## **🐳 Running with Docker (Optional)**
If you prefer running the application inside Docker containers, follow these steps:

### 1️⃣ Configure Environment Variables 🔑
Docker requires an additional  `.env` file at the **project root**. Copy the example file:
```sh
# Linux/macOS
cp .env.example .env

# Windows (cmd)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Then, modify the database credentials in `.env` to match your setup:
```env
DB_USER=<your_database_user>
DB_PASS=<your_database_password>
DB_NAME=<your_database_name>
```

Also, ensure server/src/configs/.env is updated with the following:
```env
DB_HOST=db  # Use "db" instead of "localhost" when running inside Docker
NODE_ENV=production  # Ensure the app runs in production mode inside Docker
```

### 2️⃣ Start Containers 🚢
```sh
docker compose up -d
```

### 3️⃣ Stop Containers 🛑
```sh
docker compose down
```
> [!Caution]
> ⚠️ The PostgreSQL database runs in a non-persistent volume, meaning all data will be lost if the container is stopped or restarted.

---

### 🙌 Acknowledgments
Special thanks to Open Library API for providing free and open access to book data.

---

### 👤 Author
Developed by [VireZee](https://github.com/VireZee). Feel free to contribute or provide feedback! 🚀
Contributions are welcome, especially for improving the frontend.
