# MongoDB Atlas Setup Guide

## 1. Create MongoDB Atlas Account
- Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
- Sign up for free account
- Create new project

## 2. Create Cluster
- Click "Build a Database"
- Choose "FREE" shared cluster
- Select cloud provider and region
- Name your cluster (e.g., "quiz-platform")

## 3. Configure Database Access
- Go to "Database Access" in left sidebar
- Click "Add New Database User"
- Choose "Password" authentication
- Create username and password
- Set role to "Read and write to any database"

## 4. Configure Network Access
- Go to "Network Access" in left sidebar
- Click "Add IP Address"
- For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
- For production: Add specific IP addresses

## 5. Get Connection String
- Go to "Database" in left sidebar
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password

## 6. Update Environment Variables
```bash
# In your .env file:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-platform?retryWrites=true&w=majority
```

## 7. Test Connection
```bash
npm run server
# Should see "MongoDB connected" in console
```

## Benefits of MongoDB Atlas
- ✅ Free tier available (512MB storage)
- ✅ Automatic backups
- ✅ Built-in security features
- ✅ Global clusters
- ✅ Monitoring and alerts
- ✅ No server maintenance required

## Security Best Practices
- Use strong passwords for database users
- Restrict IP access in production
- Enable two-factor authentication
- Regularly rotate credentials
- Use environment variables for sensitive data