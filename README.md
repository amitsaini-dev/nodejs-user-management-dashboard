# Node.js User Management Dashboard

A full-stack User Management System built using Node.js, Express, MySQL, and EJS.  
This application allows users to perform basic CRUD (Create, Read, Update, Delete) operations.

---

## 🚀 Features

- Add new users  
- View all users  
- Edit username (with password verification)  
- Delete user (with email & password verification)  
- Display total number of users on homepage  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Frontend:** EJS (Embedded JavaScript Templates)  
- **Other Tools:** UUID, Faker.js, Method-Override  

---

## 📂 Project Structure


project-root/
│── views/ # EJS templates
│── public/ # Static files (CSS)
│── index.js # Main server file
│── package.json


---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/amitsaini-dev/nodejs-user-management-dashboard.git

Navigate to project folder:

cd nodejs-user-management-dashboard

Install dependencies:

npm install

Setup MySQL database:

Create a database named delta_app

Create a user table with fields: id, username, email, password

Start the server:

node index.js

Open in browser:

http://localhost:8080
🔮 Future Improvements

Add authentication with hashed passwords

Improve UI/UX with better styling

Add validations and error handling

Convert to REST API + frontend framework (React)

👨‍💻 Author

Amit Saini