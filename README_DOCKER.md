# **📚 PERN Open Library**
A lightweight **Open Library System** powered by the **PERN Stack** (**PostgreSQL, Express.js, React, Node.js**), fetching book data from the **Open Library API**.

---

## 🚀 Quick Start
### 1️⃣ Pull the Images ⏬
```sh
docker pull postgres:latest
docker pull virezee/pern-open-library-backend:latest
docker pull virezee/pern-open-library-frontend:latest
```

### 2️⃣ Create a Docker Network 📡
```sh
docker network create <your_network_name>
```
> [!Note]
> **Replace values inside <...> with your preferred network name.**

### 3️⃣ Run the Containers 🚢
#### 🗄️ Database 🗃️
```sh
docker run -d --name <your_database_container_name> `
  --network <your_network_name> `
  -e POSTGRES_USER=<your_database_user> `
  -e POSTGRES_PASSWORD=<your_database_password> `
  -e POSTGRES_DB=<your_database_name> `
  --restart always `
  postgres:latest
```
> [!Note]
> **Replace values inside <...> with your preferred container name and actual database credentials.**

#### ⚙️ Backend 🌐
```sh
docker run -d --name <your_backend_container_name> `
  --network <your_network_name> `
  -e DB_HOST=<your_database_container_name> `
  -e DB_PORT=5432 `
  -e DB_USER=<your_database_user> `
  -e DB_PASS=<your_database_password> `
  -e DB_NAME=<your_database_name> `
  -e DOMAIN=localhost `
  -e PORT=3001 `
  -e CLIENT_PORT=3000 `
  -e SECRET_KEY=<your_secret_key> `
  -e PEPPER=<your_pepper> `
  -e NODE_ENV=production `
  -p 3001:3001 `
  --restart always `
  virezee/pern-open-library-backend:latest
```
> [!Note]
> **Ensure <your_database_container_name> matches the name given in the database setup.**

#### 🖥️ Frontend 📱
```sh
docker run -d --name <your_frontend_container_name> `
  --network <your_network_name> `
  -e VITE_DOMAIN=localhost `
  -e VITE_SERVER_PORT=3001 `
  -p 3000:3000 `
  --restart always `
  virezee/pern-open-library-frontend:latest
```

---

## ⛔ Stopping & Removing Containers
To **stop** the running containers:
```sh
docker stop <your_frontend_container_name> <your_backend_container_name> <your_database_container_name>
```
To **remove** the containers:
```sh
docker rm <your_frontend_container_name> <your_backend_container_name> <your_database_container_name>
```
To **remove** the network:
```sh
docker network rm <your_network_name>
```

---

## 🔗 [GitHub Repository](https://github.com/VireZee/PERN-Open-Library)
