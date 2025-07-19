<div align="center">

![Growin Logo](./assets/growin-logo.png)

**Grow your knowledge by learning on Growin**

[![NestJS](https://img.shields.io/badge/11-red?logo=nestjs&label=Nest.JS)](https://nestjs.com/)
[![NextJS](https://img.shields.io/badge/15-black?logo=next.js&label=Next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/5.7-blue?logo=typescript&label=TypeScript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/16-blue?logo=postgresql&logoColor=blue&label=PostgreSQL)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/7.4-red?logo=redis&label=Redis)](https://redis.io/)

</div>

## Project Demo

https://github.com/user-attachments/assets/305a15b2-b9ac-4955-aa96-23e00d304c82


## 📖 Overview

Gowin is an E-learning platform designed for individuals to enhance their skills and knowledge through interactive courses and collaborative learning experiences. It also allows users to create and manage their own courses, fostering a community of learners and educators.


## ✨ Key Features

### 🔐 Authentication & Authorization

- **Secure Login/Registration**: Email-based authentication and Google OAuth support
- **User Modes**: Instructor, and Student Modes with distinct permissions
- **JWT Token Management**: Automatic token refresh and secure session handling

### 🏢 Instructor

- **Courses Management**: Create and manage multiple courses
- **Lessons Management**: Add, edit, and delete lessons within courses
- **Course Categories**: Organize courses into pre-defined categories for better navigation

### 📝 Learner

- **Markdown Editor**: Buy and enroll in courses
- **Interactive Lessons**: View lessons with embedded videos
- **Course Reviews**: Write and read reviews for courses

### 🛒 Cart Management

- **Add to Cart**: Users can add courses to their cart
- **View Cart**: Display all items in the cart across user devices
- **Checkout Process**: checkout for course enrollment
- **Payment Integration**: Integration with paytabs for various payment methods (available in Egypt and other middle eastern countries)

### 🎨 Frontend

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **State Management**: zustand

### 🔧 Backend

- **Framework**: NestJS 11 with TypeScript
- **Database**: PostgreSQL 16 with TypeORM
- **Caching**: Redis 7.4 for cart management
- **Authentication**: JWT with refresh tokens
- **File Storage**: Cloudinary for video uploads and Imgbb for image uploads
- **Validation**: Class-validator

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm package manager
- PostgreSQL 16 instance
- Redis 7.4 instance (for cart management)
- Cloudinary account (for Video uploads)
- Imgbb account (for Image uploads)
- Paytabs account (for payment processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:AbdelrahmanSalah211/growin.git
   cd growin
   ```

2. **Install dependencies**

- for both frontend and backend: directories you need to cd into each directory and run:
   ```bash
    npm install
   ```

3. **Set up environment variables**

   **For Frontend**:

   ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    PASSWORD_MIN_LENGTH=8
    USERNAME_MIN_LENGTH=3 
   ```

   **For Backend**:

   ```env
    PORT=3000
    DB_PORT=
    DB_HOST=
    DB_NAME=
    DB_USER=a
    DB_PASSWORD=
    JWT_SECRET=
    JWT_REFRESH_SECRET=
    IMGBB_API_KEY=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    EMAIL_USERNAME=
    EMAIL_PASSWORD=
    EMAIL_HOST=
    EMAIL_PORT=
    EMAIL_FROM=
    FRONTEND_URL=
    FRONTEND_REDIRECT_URL=
    BACKEND_CALLBACK_URL=
    CLOUDINARY_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    REDIS_HOST=
    REDIS_PORT=
    REDIS_USERNAME=
    REDIS_PASSWORD=
    PAYTABS_PROFILE_ID=
    PAYTABS_SECRET_KEY=
    PAYTABS_REGION=
   ```

4. **Start the development servers**

- for backend

  ```bash
    npm run start:dev
  ```

- for frontend

  ```bash
    npm run dev
  ```


5. **Access the application**
   - **Frontend**: [http://localhost:3000](http://localhost:5000)
   - **Backend**: [http://localhost:8080/api/v1](http://localhost:3000)

## 📚 Documentation

- **[API Documentation](./assets/Growin.postman_collection.json)** - Postman backend API collection with endpoints, request/response formats, and examples.


### Project Structure


```bash
Growin/
├── backend/
│       └── src/
│            └── modules/
│                   ├── auth/
│                   ├── authorization/
│                   ├── cart/
│                   ├── course/
│                   ├── course-category/
│                   ├── enrollment/
│                   ├── image/
│                   ├── lesson/
│                   ├── mail/
│                   ├── paytabs/
│                   ├── redis/
│                   ├── review/
│                   ├── user/
│                   └── videos/
│
│
└── frontend/
      └── src/
          ├── app/
          ├── components/
          ├── hooks/
          ├── services/
          ├── types/
          └── utils/

```

## 👥 Team Members

- **Abdelrahman Salah Ebrahim**
- **Abdelrahman Mohamed Embaby**
- **Abdelrahman Sherif Saeed**
- **Ramy Abdelmoneim Ahmed**
- **Omar Muhammad Sayed**
- **Ahmed Samir Hagar**

