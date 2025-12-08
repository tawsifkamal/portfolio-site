# Backend Server

This directory contains the Express.js backend server and Google Cloud AI integration for the portfolio website.

## 📋 Overview

The backend provides:
- Basic Express server setup
- Google Cloud Vertex AI integration for image analysis
- Potential API endpoints for dynamic content

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Google Cloud Platform account (for AI features)
- Google Cloud credentials configured

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install
```

### Configuration

#### Google Cloud Setup

For the AI features to work, you need to configure Google Cloud credentials:

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs**
   - Enable Vertex AI API
   - Enable Cloud Storage API

3. **Create Service Account**
   - Go to IAM & Admin > Service Accounts
   - Create a new service account
   - Grant necessary permissions (Vertex AI User, Storage Object Viewer)
   - Download the JSON key file

4. **Set Environment Variables**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   ```

   Or add to your `.bashrc` / `.zshrc`:
   ```bash
   echo 'export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"' >> ~/.bashrc
   source ~/.bashrc
   ```

#### Update Configuration

Edit `genAi.js` to configure your project settings:

```javascript
const projectId = "your-project-id";        // Your GCP project ID
const location = "us-central1";              // Your preferred region
const image = "gs://your-bucket/image.jpg";  // Cloud Storage image path
```

## 🏃 Running the Server

### Development Mode

```bash
# From the server directory
node index.js
```

The server will start on `http://localhost:3000/`.

### Testing AI Integration

```bash
# Run the AI test script
node genAi.js
```

This will:
1. Connect to Google Cloud Vertex AI
2. Load an image from Cloud Storage
3. Send the image to the AI model
4. Generate a description of the image
5. Print the results to the console

## 📁 File Structure

```
server/
├── index.js        # Express server entry point
├── genAi.js        # Google Cloud Vertex AI integration
├── test.js         # Test utilities
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## 📦 Dependencies

### Production Dependencies

```json
{
  "@google-cloud/storage": "^7.7.0",
  "@google-cloud/vertexai": "^1.1.0",
  "express": "^4.18.2"
}
```

- **express**: Web framework for Node.js
- **@google-cloud/vertexai**: Google Cloud Vertex AI client library
- **@google-cloud/storage**: Google Cloud Storage client library

## 🔌 API Endpoints

### Current Endpoints

#### `GET /`
Returns a simple "Hello World!" message.

**Response:**
```
Hello World!
```

### Planned Endpoints

Future API endpoints could include:

- `GET /api/projects` - Fetch projects dynamically
- `GET /api/experience` - Fetch work experience
- `GET /api/articles` - Fetch articles
- `POST /api/analyze-image` - AI-powered image analysis
- `POST /api/generate-content` - AI-powered content generation

## 🤖 Google Cloud Vertex AI Integration

### Image Analysis (`genAi.js`)

The `genAi.js` file demonstrates how to use Google Cloud Vertex AI for image analysis.

**Features:**
- Load images from Google Cloud Storage
- Use generative AI models for image understanding
- Streaming and non-streaming response support

**Example Usage:**

```javascript
const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: 'your-project-id',
  location: 'us-central1'
});

// Get the generative model
const model = vertexAI.preview.getGenerativeModel({
  model: 'gemini-pro-vision' // or other available models
});

// Prepare the request
const request = {
  contents: [{
    role: 'user',
    parts: [
      {
        fileData: {
          fileUri: 'gs://your-bucket/image.jpg',
          mimeType: 'image/jpeg'
        }
      },
      {
        text: 'What is shown in this image?'
      }
    ]
  }]
};

// Generate content
const response = await model.generateContentStream(request);
const result = await response.response;
console.log(result.candidates[0].content.parts[0].text);
```

### Supported Models

- **gemini-pro-vision**: Image understanding and analysis
- **gemini-pro**: Text generation
- Other models available in Vertex AI

### Image Sources

Images can be loaded from:
- Google Cloud Storage (`gs://bucket-name/image.jpg`)
- Base64-encoded strings
- Public URLs (with proper configuration)

## 🔒 Security Considerations

### Environment Variables

**Never commit sensitive credentials to version control!**

Use environment variables for:
- Google Cloud credentials
- API keys
- Project IDs
- Sensitive configuration

### Best Practices

1. **Use `.gitignore`** to exclude credential files:
   ```gitignore
   # Google Cloud credentials
   *.json
   service-account-key.json
   .env
   ```

2. **Use environment variables** for configuration:
   ```javascript
   const projectId = process.env.GCP_PROJECT_ID || 'default-project';
   ```

3. **Validate inputs** for any user-facing endpoints
4. **Use CORS** appropriately for frontend-backend communication
5. **Rate limiting** for API endpoints
6. **Authentication** for sensitive operations

## 🚀 Deployment

### Environment Variables for Production

Set these environment variables in your production environment:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
GCP_PROJECT_ID=your-project-id
GCP_LOCATION=us-central1
PORT=3000
NODE_ENV=production
```

### Deployment Platforms

This backend can be deployed to:

- **Google Cloud Run**: Containerized serverless deployment
- **Google Cloud App Engine**: Managed platform
- **Google Compute Engine**: Virtual machines
- **Heroku**: Platform as a Service
- **AWS / Azure**: Other cloud providers

### Example: Google Cloud Run Deployment

1. **Create a Dockerfile**:
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "index.js"]
   ```

2. **Build and deploy**:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/portfolio-backend
   gcloud run deploy portfolio-backend \
     --image gcr.io/PROJECT_ID/portfolio-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

## 🧪 Testing

### Manual Testing

Test the server endpoints:

```bash
# Test basic endpoint
curl http://localhost:3000/

# Test with query parameters
curl http://localhost:3000/api/projects?filter=featured
```

### Automated Testing

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "test:ai": "node genAi.js"
  }
}
```

## 📊 Monitoring and Logging

### Development Logging

Add logging for debugging:

```javascript
const express = require('express');
const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Production Logging

For production, consider using:
- **Winston** or **Bunyan** for structured logging
- **Google Cloud Logging** for centralized logs
- **Error tracking** services (Sentry, Rollbar)

## 🔧 Troubleshooting

### Common Issues

#### Authentication Errors

```
Error: Could not load the default credentials
```

**Solution:**
- Ensure `GOOGLE_APPLICATION_CREDENTIALS` is set correctly
- Verify the service account key file exists and is valid
- Check that the service account has necessary permissions

#### API Not Enabled

```
Error: Vertex AI API has not been used in project
```

**Solution:**
```bash
gcloud services enable aiplatform.googleapis.com
```

#### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

#### Module Not Found

```
Error: Cannot find module '@google-cloud/vertexai'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Google Cloud Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Google Cloud Storage Documentation](https://cloud.google.com/storage/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contributing

When adding new backend features:

1. Follow Node.js best practices
2. Add error handling for all operations
3. Document new endpoints in this README
4. Add appropriate tests
5. Use environment variables for configuration
6. Never commit credentials or secrets

## 📝 License

This backend is part of the portfolio website project and shares the same license.

---

For questions or issues, please refer to the main project README or open an issue.
