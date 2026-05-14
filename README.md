# 🎓 Student Attendance Management System

A Full Stack Web Application developed using **Spring Boot, React JS, JDBC, and MySQL** to simplify and automate student attendance management in educational institutions.

---

# 🚀 Features

## 👨‍💼 Admin Module
- Secure Admin Login
- Add New Students
- Delete Student Records
- Manage Student Information

## 👨‍🏫 Faculty Module
- Faculty Login
- Mark Student Attendance
- Date-wise Attendance Tracking
- Attendance Management Dashboard

## 👨‍🎓 Student Module
- Student Login
- View Attendance History
- Monitor Attendance Status

---

# 🛠️ Tech Stack

### Frontend
- React JS
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Java 17
- Spring Boot
- Spring MVC
- JDBC
- REST APIs
- DAO Design Pattern

### Database
- MySQL

---

# 📂 Project Structure

```text
Student-Attendance-Management/
│
├── backend/
├── frontend/
├── screenshots/
├── schema.sql
└── README.md
```

---

# 📸 Project Outputs

## 🔐 Login Page

<img width="242" height="182" alt="login" src="https://github.com/user-attachments/assets/300ec92f-5d16-4efa-a398-c04784b59789" />


## 👨‍💼 Admin Dashboard

<img width="959" height="512" alt="admin " src="https://github.com/user-attachments/assets/d11d1f19-d165-4f22-90c0-0f59ba0e4cd1" />


## 👨‍🏫 Faculty Dashboard

<img width="850" height="460" alt="faculty dashboard" src="https://github.com/user-attachments/assets/430afd4d-a4cd-416f-8075-f8b1d75afb80" />


## 👨‍🎓 Student Dashboard

<img width="736" height="209" alt="student dashboard" src="https://github.com/user-attachments/assets/d7f41b4c-0b92-43ca-b4cf-9c4e6b382e96" />


# ⚙️ Database Configuration

Update MySQL credentials inside:

```properties
backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/attendance_db
spring.datasource.username=root
spring.datasource.password=tiger
```

---

# ▶️ Run Backend

```bash
cd backend
mvnd spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# ▶️ Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🔑 Default Login Credentials

| Role | Username | Password |
|------|-----------|-----------|
| Admin | admin | admin123 |
| Faculty | faculty | faculty123 |
| Student | student | student123 |

---

# 🌟 Key Highlights

- Full Stack Web Application
- CRUD Operations
- REST API Integration
- Responsive UI
- JDBC Connectivity
- DAO Design Pattern
- MySQL Integration
- Role-Based Authentication

---

# 📖 Future Enhancements

- JWT Authentication
- Attendance Analytics
- PDF/Excel Report Export
- Email Notifications
- QR Code Attendance

---

# 👩‍💻 Author

**Chandana T**  
Java Full Stack Developer

---

# ⭐ GitHub

If you like this project, don't forget to ⭐ the repository!
