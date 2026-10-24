# CareerConnect 💼

CareerConnect is a full-stack MERN-based job portal that connects students/job seekers with recruiters.

Students can create an account, manage their profile, browse and search for jobs, view job details, and apply for jobs. Recruiters can create companies, manage company information, post jobs, manage job postings, and view applicants.

---

## 🚀 Features

### 🧠 Technical Highlights

- *State Management:* Utilized Redux Toolkit to prevent redundant API calls and manage global state efficiently across dynamic UI components.
- *Security:* Implemented Role-Based Access Control (RBAC) with HTTP-only cookies and bcrypt password hashing to secure distinct workflows.
- *Optimized Storage:* Integrated Multer and Cloudinary API for direct cloud media uploads, reducing server payload and ensuring fast CDN delivery.
- *Advanced Queries:* Engineered complex MongoDB aggregation pipelines for robust job search, filtering, and duplicate application prevention.


### 👨‍🎓 Student / Job Seeker

- User registration and login
- Email verification
- Secure authentication
- Student profile management
- Profile photo upload
- Profile photo cropping
- Browse available jobs
- Search jobs
- View detailed job information
- Apply for jobs
- Prevent duplicate job applications
- View application information
- Responsive user interface

### 🧑‍💼 Recruiter

- Recruiter registration and login
- Recruiter profile management
- Update recruiter profile
- Create companies
- View companies
- Update company information
- Upload and update company logos
- Create job postings
- Edit job postings
- Delete job postings
- View posted jobs
- View job applicants
- Manage applications
- Role-based access control

### 💼 Job Management

Recruiters can create jobs with:

- Job title
- Job description
- Requirements
- Salary
- Location
- Job type
- Experience level
- Number of positions
- Company
- Posted date

Students can:

- Browse jobs
- Search jobs
- View complete job details
- See total applicants
- Apply for available jobs

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Shadcn/UI
- Lucide React
- Sonner
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie-based Authentication
- Multer
- Cloudinary

### Tools

- Git
- GitHub
- VS Code
- npm

---

## 📁 Project Structure

```text
CareerConnect/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

---

## ⚙️ Installation & Setup

Follow the steps below to run CareerConnect locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/Pankaj2299/career-connect.git]
```

Move into the project directory:
```
cd CareerConnect
```

2. Backend Setup

Open the backend directory:
```
cd backend
```

Install backend dependencies:

```
npm install
```

Create a .env file inside the backend directory:

```env
MONGO_URI="your_mongodb_connection_string"
PORT="8000"
SECRET_KEY="your_jwt_secret_key"
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"
EMAIL_USER="your_email_address@gmail.com"
EMAIL_PASS="your_email_app_password"
```
Start the backend development server:

```
npm run dev
```

The backend will run on:

http://localhost:8000

3. Frontend Setup

Open a new terminal and move into the frontend directory:

```
cd frontend
```

Install frontend dependencies:

```
npm install
```

Create a .env file inside the frontend directory if your project uses frontend environment variables.

Example:

```
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend development server:

```
npm run dev
```

The frontend will usually run on:

http://localhost:5173



## 🔐 Environment Variables

CareerConnect requires environment variables for database connection, authentication, cloud image storage, and API configuration.

### Backend Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port number for the backend server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET_KEY` | Secret key used for JWT authentication |
| `CLOUD_NAME` | Cloudinary cloud name |
| `API_KEY` | Cloudinary API key |
| `API_SECRET` | Cloudinary API secret |

### Frontend Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL |

---

## 🗄️ Database

CareerConnect uses MongoDB as its database. The application uses Mongoose to interact with MongoDB.

The main data models include:
- User
- Company
- Job
- Application

*Make sure MongoDB is configured correctly before starting the backend server.*

---

## ☁️ Cloudinary Setup

CareerConnect uses Cloudinary for image storage. Cloudinary is used for:
- Student profile photos
- Recruiter profile photos
- Company logos

**To configure Cloudinary:**
1. Create a Cloudinary account.
2. Open your Cloudinary dashboard.
3. Copy your Cloud Name.
4. Copy your API Key.
5. Copy your API Secret.
6. Add these values to the backend `.env` file.

**Example:**
```env
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## 🔐 Authentication & Authorization

CareerConnect uses JWT-based authentication with HTTP cookies. The application provides:
- Secure user authentication
- Login and logout
- Email verification
- Role-based access control
- Protected routes
- Recruiter-only routes
- Student-specific functionality
- Authentication & Authorization middleware

There are two main user roles:

**Student** can:
- Manage their profile
- Browse jobs
- Search jobs
- View job details
- Apply for jobs

**Recruiter** can:
- Manage their profile
- Create & manage companies
- Post, edit, and delete jobs
- View applicants
- Manage applications

---

## 📧 Email Verification

CareerConnect includes email verification for user accounts. Users are required to verify their email address during the registration process before accessing the application's protected functionality.

---

## 📱 Responsive Design

The frontend is designed to work across different screen sizes. Supported layouts include:
- Desktop
- Tablet
- Mobile

The navigation bar also provides separate desktop and mobile navigation experiences.

---

## 🔎 Job Search & Browsing

Students can browse available job postings and search for jobs based on available job information. Each job provides details such as:
- Job title & Company
- Location & Salary
- Job type & Experience level
- Number of positions
- Description & Requirements
- Total applicants & Posted date

---

## 📝 Job Applications

Students can apply for available jobs. The application system includes:
- Job application creation
- Application tracking
- Duplicate application prevention
- Applicant information
- Recruiter access to applicants

*Note: A student cannot apply to the same job multiple times.*

---

## 🏢 Company Management

Recruiters can manage their companies through the recruiter dashboard. Company management includes:
- Create, view, and update company
- Company description & website
- Company location
- Company logo upload & update

---

## 💼 Job Posting Management

Recruiters can manage their job postings. Job management includes:
- Create, edit, and delete job
- View posted jobs
- View job details & applicants

*Job requirements are stored as an array and displayed individually on the job details page.*



## ▶️ Running the Project

To run the complete application, start both frontend and backend servers.

**Terminal 1 — Backend**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
```

Then open the frontend URL shown by Vite in your browser.

## 🧪 Development

For development, make sure:

- MongoDB is connected
- Backend server is running
- Frontend server is running
- Required environment variables are configured
- Cloudinary credentials are configured
- Frontend API configuration points to the backend

## 📌 Important Notes

- Do not commit .env files.
- Keep JWT and Cloudinary credentials private.
- Make sure MongoDB is accessible before starting the backend.
- Run frontend and backend separately during development.
- Use the appropriate user role to access recruiter and student functionality.

## 🚀 Future Improvements

Possible future improvements include:

- Advanced job filtering
- Job categories
- Skills-based job matching
- Recruiter dashboard analytics
- Application status tracking
- Saved jobs
- Job recommendations
- Pagination
- Notifications
- Admin dashboard

## 👨‍💻 Author

Pankaj Kumar

CareerConnect — Full-Stack MERN Job Portal

## 📄 License

This project is created for learning and portfolio purposes.

