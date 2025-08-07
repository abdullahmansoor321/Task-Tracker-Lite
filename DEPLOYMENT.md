# 🚀 Deployment Checklist

## Pre-Deployment Setup

### Backend (Render)
- [ ] MongoDB Atlas database created and configured
- [ ] Cloudinary account set up (if using image uploads)
- [ ] Environment variables prepared

### Frontend (Vercel) 
- [ ] Backend URL ready to configure in environment variables

## Backend Deployment on Render

1. **Create Render Account**
   - [ ] Sign up at [render.com](https://render.com)
   - [ ] Connect your GitHub account

2. **Create Web Service**
   - [ ] Click "New +" → "Web Service"
   - [ ] Connect your GitHub repository
   - [ ] Configure service:
     - Name: `task-tracker-backend`
     - Root Directory: `backend`
     - Runtime: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasktracker
   JWT_SECRET=your_super_secure_jwt_secret_at_least_32_characters
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=https://your-app-name.vercel.app
   ```

4. **Deploy**
   - [ ] Click "Create Web Service"
   - [ ] Wait for deployment to complete
   - [ ] Note the backend URL (e.g., `https://task-tracker-backend.onrender.com`)

## Frontend Deployment on Vercel

1. **Create Vercel Account**
   - [ ] Sign up at [vercel.com](https://vercel.com)
   - [ ] Connect your GitHub account

2. **Import Project**
   - [ ] Click "New Project"
   - [ ] Import your GitHub repository
   - [ ] Configure project:
     - Framework Preset: `Vite`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Environment Variables**
   Add this in Vercel dashboard:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com/api
   ```

4. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait for deployment to complete
   - [ ] Test the live application

## Post-Deployment

1. **Update Backend CORS**
   - [ ] Update `FRONTEND_URL` environment variable in Render with your Vercel URL
   - [ ] Redeploy backend service

2. **Test Complete Flow**
   - [ ] User registration works
   - [ ] User login works
   - [ ] Task creation works
   - [ ] Task management works
   - [ ] Theme switching works
   - [ ] All pages load correctly

3. **Performance Check**
   - [ ] Frontend loads quickly
   - [ ] API responses are fast
   - [ ] No console errors

## Troubleshooting

### Common Issues
- **CORS Errors**: Ensure frontend URL is added to backend CORS configuration
- **API Not Found**: Check VITE_API_URL environment variable
- **Database Connection**: Verify MongoDB URI is correct
- **Authentication Issues**: Check JWT_SECRET is set properly

### Debug Tools
- Render logs: Dashboard → Service → Logs
- Vercel logs: Dashboard → Project → Functions tab
- Browser Network tab: Check API requests and responses

## Success! 🎉
Once all checkboxes are completed, your Task Tracker Lite application should be live and fully functional!
