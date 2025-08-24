# 📝 Online Exam Portal

An online exam portal built with **React (frontend)** and **Node.js + MongoDB (backend)**.  
Users can register, log in, attempt exams, and view results.

---

## 📌 Installation Guide

### Step 1: Clone Repository </summary>

Run the following:
```bash
git clone https://github.com/MadhalasaSJ/exam-portal.git
cd exam-portal
```

### Step 2: Setup Backend 

1. **Move into backend:**
   ```bash
   cd exam-backend
   npm install
   ```


3. **Create a `.env` file inside `exam-backend/`:**
   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PORT=5000
   ```



5. **Run backend:**
   ```bash
   node server.js
   ```

👉 Backend will run at **http://localhost:5000**


---

### Step 3: Setup Frontend 


1. **Move into frontend:**
   ```bash
   cd ../exam-frontend
   npm install
   npm start
   ```


👉 Frontend will run at **http://localhost:3000**


---

## 📡 API Endpoints

#### **Authentication**
- `POST /auth/register` → Register user  
- `POST /auth/login` → Login & get token  

#### **Exam**
- `GET /exam/start` → Fetch random questions  
- `POST /exam/submit` → Submit answers & get score  
- `GET /exam/results` → Get user’s results  

---

## 📬 Postman Collection

Import the included ExamSystem.postman_collection.json file in Postman to test APIs.
Alternatively, use curl:
#### Register
curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"user1","email":"user1@example.com","password":"user1####"}'
#### Login
curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user1@example.com","password":"user1####"}'

---

## 📂 Project Structure

exam-portal/

│── exam-backend/ # Express + MongoDB backend

│── exam-frontend/ # React frontend

│── README.md

---

## 🧪 Usage Flow
1. Register/Login  
2. Start exam → Questions appear one by one  
3. Submit exam → Score displayed on screen  
4. Results stored in MongoDB 
