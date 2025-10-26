# 🎓 College Predictor

<div align="center">

![College Predictor Banner](https://img.shields.io/badge/College-Predictor-blue?style=for-the-badge&logo=graduation-cap)

**An intelligent platform to predict engineering colleges based on your entrance exam rank**

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

[Live Demo](https://colleges-predictorr.vercel.app) • [Report Bug](https://github.com/yourusername/college-predictor/issues) • [Request Feature](https://github.com/yourusername/college-predictor/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About The Project

**College Predictor** is a comprehensive web application designed to help engineering aspirants make informed decisions about their college admissions. By leveraging entrance exam ranks, category, and preferences, the platform predicts suitable colleges and branches with high accuracy.

### 🌟 Key Highlights

- **Smart Prediction Algorithm**: Advanced filtering based on rank, category, gender, and location
- **AI-Powered Counselling**: Interactive chatbot powered by Google's Gemini AI for personalized guidance
- **Personalized College Lists**: Save and rank your favorite colleges for easy comparison
- **Real-time Updates**: Access to latest cutoff trends and college information
- **Secure Authentication**: JWT-based authentication with OTP verification
- **Responsive Design**: Seamless experience across all devices

---

## ✨ Features

### 🔐 Authentication & Security

- User registration with email verification (OTP)
- Secure login with JWT tokens
- Password reset functionality
- Protected routes for authenticated users

### 🎯 College Prediction

- Predict colleges based on:
  - Entrance exam rank
  - Category (Open, OBC, SC, ST, etc.)
  - Gender preference
  - Home state quota
  - Preferred cities and branches
- Pagination support for large result sets
- Detailed college information with cutoff trends

### 🤖 AI Counselling

- Interactive chat with AI counsellor powered by Gemini AI
- Multiple counselling sessions
- Context-aware responses
- Session history and management

### 📚 College Management

- Browse complete college database
- Add colleges to personal shortlist
- Rank and reorder saved colleges
- Remove colleges from list
- Export college list (planned feature)

### 📞 Contact & Support

- Contact form with email notifications
- Branch guide for course information
- About and FAQ sections
- Terms of Service & Privacy Policy

### 🎨 User Experience

- Modern, intuitive UI with Tailwind CSS
- Dark mode support (planned)
- Mobile-responsive design
- Fast loading times with Vite
- Toast notifications for user feedback

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Lucide React** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Google Gemini AI** - AI counselling
- **express-rate-limit** - API rate limiting

### DevOps & Deployment

- **Vercel** - Frontend & Backend hosting
- **MongoDB Atlas** - Database hosting
- **Git** - Version control
- **npm** - Package manager

---

## 🏗️ System Architecture

```mermaid
graph TB
    A[Client Browser] -->|HTTPS| B[React Frontend]
    B -->|API Calls| C[Express Backend]
    C -->|Auth Middleware| D[JWT Verification]
    C -->|Database Queries| E[MongoDB Atlas]
    C -->|AI Requests| F[Google Gemini AI]
    C -->|Email Service| G[SMTP Server]

    subgraph Frontend
        B
        H[React Router]
        I[Context API]
        J[Axios Interceptors]
    end

    subgraph Backend
        C
        K[Routes]
        L[Controllers]
        M[Models]
        D
    end

    subgraph Database
        E
        N[Users Collection]
        O[Colleges Collection]
        P[College Lists]
        Q[Counselling Sessions]
    end
```

### Request Flow

1. **User Authentication**

   ```
   Client → Login/Register → Backend → Verify → Generate JWT → Store Token → Authenticated Access
   ```

2. **College Prediction**

   ```
   Client → Submit Criteria → Backend → Query Database → Apply Filters → Return Results → Display
   ```

3. **AI Counselling**
   ```
   Client → Send Message → Backend → Gemini AI API → Process Response → Store Session → Return Answer
   ```

---

## 📁 Project Structure

```
College_Predictor/
│
├── college-predictor-frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PasswordStrengthIndicator.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── contexts/            # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CollegePredictor.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── CollegesList.jsx
│   │   │   ├── CollegeList.jsx
│   │   │   ├── AICounselling.jsx
│   │   │   ├── BranchGuide.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   └── TermsOfService.jsx
│   │   │
│   │   ├── services/            # API service layer
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx              # Main App component
│   │   ├── main.jsx             # Entry point
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── public/                  # Static assets
│   ├── .env.development         # Development environment variables
│   ├── .env.production          # Production environment variables
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── eslint.config.js         # ESLint configuration
│   └── package.json             # Frontend dependencies
│
├── college-predictor-backend/
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js              # User schema with auth
│   │   ├── College.js           # College data schema
│   │   ├── CollegeList.js       # User's saved colleges
│   │   ├── Counselling.js       # AI chat sessions
│   │   └── Otp.js               # OTP verification
│   │
│   ├── routes/                  # Express routes
│   │   ├── users.js             # Auth & user management
│   │   ├── colleges.js          # College prediction & listing
│   │   ├── collegeList.js       # Personal college list CRUD
│   │   ├── counselling.js       # AI counselling endpoints
│   │   └── contact.js           # Contact form handler
│   │
│   ├── middleware/              # Custom middleware
│   │   └── auth.js              # JWT authentication
│   │
│   ├── utils/                   # Utility functions
│   │   ├── sendEmail.js         # Email sending logic
│   │   └── emailTemplates.js    # Email templates
│   │
│   ├── branches.json            # Engineering branches data
│   ├── branchNormalization.json # Branch name normalization
│   ├── cities.json              # Cities data
│   ├── server.js                # Express server setup
│   ├── vercel.json              # Vercel deployment config
│   └── package.json             # Backend dependencies
│
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)

  ```bash
  node --version
  ```

- **npm** (v8 or higher)

  ```bash
  npm --version
  ```

- **MongoDB** (Local installation or Atlas account)

  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended)

- **Git**
  ```bash
  git --version
  ```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/college-predictor.git
   cd college-predictor
   ```

2. **Install Backend Dependencies**

   ```bash
   cd college-predictor-backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../college-predictor-frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `college-predictor-backend` directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/college-predictor?retryWrites=true&w=majority

# JWT Secret (Use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (Gmail recommended)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Getting API Keys:**

- **MongoDB Atlas**:

  1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a cluster → Get connection string
  3. Whitelist IP: `0.0.0.0/0` (for development)

- **Gemini API**:

  1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
  2. Create API key

- **Gmail App Password**:
  1. Enable 2-Step Verification on your Google Account
  2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

#### Frontend (.env.development)

Already configured in the repository:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Frontend (.env.production)

Update with your deployed backend URL:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

---

## 💻 Usage

### Development Mode

1. **Start Backend Server**

   ```bash
   cd college-predictor-backend
   npm start
   ```

   Backend runs on: `http://localhost:5000`

2. **Start Frontend Development Server**

   ```bash
   cd college-predictor-frontend
   npm run dev
   ```

   Frontend runs on: `http://localhost:5173`

3. **Access the Application**
   - Open browser: `http://localhost:5173`
   - Register a new account
   - Verify email with OTP
   - Start predicting colleges!

### Production Build

**Frontend:**

```bash
cd college-predictor-frontend
npm run build
npm run preview  # Preview production build
```

**Backend:**

```bash
cd college-predictor-backend
npm start  # Uses NODE_ENV=production
```

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-backend-url.vercel.app/api
```

### Endpoints

#### Authentication

| Method | Endpoint                 | Description             | Auth Required |
| ------ | ------------------------ | ----------------------- | ------------- |
| POST   | `/users/register`        | Register new user       | No            |
| POST   | `/users/verify-otp`      | Verify email OTP        | No            |
| POST   | `/users/login`           | User login              | No            |
| POST   | `/users/forgot-password` | Request password reset  | No            |
| POST   | `/users/reset-password`  | Reset password with OTP | No            |

#### Colleges

| Method | Endpoint            | Description                        | Auth Required |
| ------ | ------------------- | ---------------------------------- | ------------- |
| GET    | `/colleges`         | Get all colleges (paginated)       | No            |
| POST   | `/colleges/predict` | Predict colleges based on criteria | Yes           |
| GET    | `/colleges/:id`     | Get college by ID                  | No            |

#### College List

| Method | Endpoint                                  | Description               | Auth Required |
| ------ | ----------------------------------------- | ------------------------- | ------------- |
| GET    | `/college-list`                           | Get user's saved colleges | Yes           |
| POST   | `/college-list/add`                       | Add college to list       | Yes           |
| DELETE | `/college-list/remove/:collegeId/:branch` | Remove college            | Yes           |
| PUT    | `/college-list/rank`                      | Update college ranking    | Yes           |
| DELETE | `/college-list/clear`                     | Clear entire list         | Yes           |

#### AI Counselling

| Method | Endpoint                          | Description            | Auth Required |
| ------ | --------------------------------- | ---------------------- | ------------- |
| POST   | `/counselling/chat`               | Send message to AI     | Yes           |
| GET    | `/counselling/sessions`           | Get all sessions       | Yes           |
| GET    | `/counselling/sessions/:id`       | Get specific session   | Yes           |
| DELETE | `/counselling/sessions/:id`       | Delete session         | Yes           |
| DELETE | `/counselling/sessions/:id/clear` | Clear session messages | Yes           |

#### Contact

| Method | Endpoint   | Description       | Auth Required |
| ------ | ---------- | ----------------- | ------------- |
| POST   | `/contact` | Send contact form | No            |

### Example Request

**Predict Colleges:**

```javascript
POST /api/colleges/predict
Content-Type: application/json
Authorization: Bearer <token>

{
  "rank": 5000,
  "category": "Open",
  "gender": "Male",
  "homeState": "Maharashtra",
  "cities": ["Mumbai", "Pune"],
  "branches": ["Computer Engineering", "Information Technology"],
  "page": 1,
  "limit": 15
}
```

**Response:**

```json
{
  "success": true,
  "colleges": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalColleges": 68,
    "hasMore": true
  }
}
```

---

## 🌐 Deployment

### Deploy to Vercel

#### Backend Deployment

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Root Directory**: `college-predictor-backend`
     - **Framework Preset**: Other
     - **Build Command**: (leave empty)
     - **Output Directory**: (leave empty)

3. **Add Environment Variables**

   - Go to Project Settings → Environment Variables
   - Add all backend environment variables
   - Set `NODE_ENV=production`

4. **Deploy**
   - Click "Deploy"
   - Copy deployment URL (e.g., `https://your-backend.vercel.app`)

#### Frontend Deployment

1. **Update Production ENV**

   ```env
   # college-predictor-frontend/.env.production
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

2. **Import to Vercel**

   - Create new project in Vercel
   - Configure:
     - **Root Directory**: `college-predictor-frontend`
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variable**

   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

4. **Deploy**

5. **Update Backend CORS**
   - Add frontend URL to backend environment:
     ```env
     FRONTEND_URL=https://your-frontend.vercel.app
     ```

---

## 📸 Screenshots

<div align="center">

### Home Page

![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### College Prediction

![Prediction](https://via.placeholder.com/800x400?text=College+Prediction)

### AI Counselling

![AI Chat](https://via.placeholder.com/800x400?text=AI+Counselling)

### Dashboard

![Dashboard](https://via.placeholder.com/800x400?text=User+Dashboard)

</div>

---

## 🗺️ Roadmap

- [x] User authentication with OTP
- [x] College prediction algorithm
- [x] AI counselling chatbot
- [x] Personal college list management
- [ ] Dark mode support
- [ ] Advanced filters (fees, placement, ratings)
- [ ] College comparison feature
- [ ] Export college list as PDF
- [ ] Mobile application (React Native)
- [ ] Admin panel for college data management
- [ ] Integration with more entrance exams (JEE Main, GATE, etc.)
- [ ] Real-time notifications
- [ ] Social features (share predictions)

See the [open issues](https://github.com/yourusername/college-predictor/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR
- Update documentation if needed

---

## 👥 Team

<div align="center">

### Developed By

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/saurrabhs">
        <img src="https://github.com/sarrabhs.png" width="100px;" alt="Saurabh Sawant"/><br />
        <sub><b>Saurabh Sawant</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/yash-shinde-018">
        <img src="https://github.com/yash-shinde-018.png" width="100px;" alt="Yash Shinde"/><br />
        <sub><b>Yash Shinde</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/pratikjedhe">
        <img src="https://github.com/pratikjedhe.png" width="100px;" alt="Pratik Jedhe"/><br />
        <sub><b>Pratik Jedhe</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub>
    </td>
  </tr>
</table>

</div>

### Connect With Us

- 📧 Email: collegespredictor@gmail.com

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Vercel Deployment Guides](https://vercel.com/docs)
- [Shields.io](https://shields.io/) for badges
- [Lucide Icons](https://lucide.dev/) for beautiful icons

---

## 📞 Support

If you like this project, please ⭐ star this repository to show your support!

For support, email saurabhsawant@example.com or create an issue in this repository.

---

<div align="center">

**Made by Saurabh Sawant, Yash Shinde & Pratik Jedhe**

</div>
