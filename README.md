Description
This project is a Role-Based Authentication System built with Node.js, Express, and MongoDB. It enables user authentication, secure access to resources, and role-based access control (RBAC) for different user roles such as Admin & User. The system ensures that only authorized users can access specific resources based on their assigned roles.

Features
User Registration:
Users and admins can register with unique credentials.
Profile images can be uploaded during registration.

Login & Authentication:
Secure login using JWT (JSON Web Token).
Passwords are hashed using bcrypt for enhanced security.

Role-Based Access Control:
Specific resources are accessible only to users with appropriate roles.
Middleware enforces access restrictions dynamically based on roles.

CRUD Operations:
Users can view, edit, and delete their profiles.
Admins can manage users.

File Upload:
Users and admins can upload profile pictures during registration.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for ORM)
Authentication: JWT (JSON Web Token), bcrypt
File Upload: Multer
Middleware: Custom middleware for authentication and role-based access control

Installation and Setup
Prerequisites
Install Node.js
Install MongoDB
Steps
Clone the Repository:

git clone https://github.com/your-username/role-based-auth.git
cd role-based-auth
Install Dependencies:

npm install

npm start
Access the Application:
The server will run at http://localhost:3000.

API Endpoints
Auth Routes
Method	Endpoint	Description	Roles
POST	/user/signup	Register a new user	Public
POST	/admin/signup	Register a new admin	Public
POST	/login	Login and get JWT	Public

User Routes
Method	Endpoint	Description	Roles
GET	/user/:id	Get the authenticated user	User, Admin
PUT	/user/:id	Update user profile	User, Admin
DELETE	/user/:id Delete user account	User, Admin

Admin Routes
Method	Endpoint	Description	Roles
GET	/admin/users	Get all users	Admin
DELETE	/admin/:id	Delete a admin by	Admin
PUT   admin/:id Update admin profile by Admin
DELETE	/admin/user/:id	Delete a user by 	Admin
PUT   admin/:id Update admin profile by Admin

Login a User
Send a POST request to /auth/login with:

{
  "email": "john@example.com",
  "password": "password123"
}
Receive a JWT token in the response.

Access Protected Routes
Include the token in the Authorization header:

Authorization: Bearer <your-jwt-token>
Security
Password Hashing: User passwords are hashed using bcrypt.
JWT Expiry: Tokens are configured to expire after a specific time for security.
Environment Variables: Sensitive keys are stored in .env and ignored in .gitignore.







You've reached your limit for using GPTs.
Upgrade to ChatGPT Plus or try again tomorrow after 3:47 AM.

Get Plus




