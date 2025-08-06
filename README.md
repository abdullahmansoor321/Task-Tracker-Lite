# 🚀 Task Tracker Lite

A modern, full-stack task management application built with the MERN stack, featuring a beautiful UI and comprehensive productivity tools.

![Task Tracker Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Task+Tracker+Lite)

## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, delete, and organize tasks
- **Smart Filtering**: Filter tasks by status, priority, and due dates
- **Real-time Updates**: Instant synchronization across devices
- **Progress Tracking**: Visual progress indicators and completion rates

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS + DaisyUI
- **Dark/Light Theme**: Toggle between themes with persistence
- **Professional Landing Page**: Marketing-focused homepage
- **Intuitive Dashboard**: Comprehensive productivity hub with analytics

### 🔐 Authentication & Security
- **Secure Authentication**: JWT-based login system
- **User Profiles**: Customizable user profiles with avatar uploads
- **Protected Routes**: Secure access to user-specific data

### 📊 Analytics & Insights
- **Productivity Metrics**: Track completion rates and productivity scores
- **Visual Statistics**: Beautiful charts and progress indicators
- **Achievement System**: Gamified productivity tracking

## 🛠️ Tech Stack

### Frontend
- **⚛️ React.js** - UI framework
- **🎨 Tailwind CSS** - Utility-first styling
- **🌼 DaisyUI** - Component library
- **🐻 Zustand** - State management
- **🚀 Vite** - Build tool
- **🎯 Lucide React** - Icons

### Backend
- **🟢 Node.js** - Runtime environment
- **🚀 Express.js** - Web framework
- **🍃 MongoDB** - Database
- **🔒 JWT** - Authentication
- **☁️ Cloudinary** - Image hosting

### Tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get user's tasks (with pagination)
## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account or local MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdullahmansoor321/Task-Tracker-Lite.git
   cd Task-Tracker-Lite
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   PORT=5001
   ```

### 🏃‍♂️ Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5001`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:5173`

## 📱 Usage

1. **Landing Page**: Visit the homepage to learn about features
2. **Sign Up**: Create a new account with email and password
3. **Dashboard**: Access your personalized productivity hub
4. **Create Tasks**: Add new tasks with titles, descriptions, and due dates
5. **Manage Tasks**: Edit, complete, or delete tasks as needed
6. **Profile**: Customize your profile and upload an avatar
7. **Settings**: Configure preferences and switch themes

## 🎨 Screenshots

### Landing Page
- Professional marketing homepage
- Feature showcases and testimonials
- Clean, modern design

### Dashboard
- Personalized greeting and statistics
- Task overview and quick actions
- Progress tracking and analytics

### Task Management
- Intuitive task creation and editing
- Smart filtering and organization
- Visual progress indicators

## 🏗️ Project Structure

```
Task-Tracker-Lite/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── lib/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── lib/
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �‍💻 Author

**Abdullah Mansoor**
- GitHub: [@abdullahmansoor321](https://github.com/abdullahmansoor321)

## 🙏 Acknowledgments

- Design inspiration from modern productivity apps
- Icons provided by Lucide React
- UI components powered by DaisyUI
- Hosting and deployment support

---

⭐ **Star this repository if you find it helpful!**

🐛 **Found a bug?** [Report it here](https://github.com/abdullahmansoor321/Task-Tracker-Lite/issues)

💡 **Have a feature request?** [Submit it here](https://github.com/abdullahmansoor321/Task-Tracker-Lite/issues)
