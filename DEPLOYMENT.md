# RegulaEase Deployment Guide

## 🚀 Deployment with Fly.io

### Prerequisites

1. **Fly CLI installed** ✅ (Already completed)
2. **Fly.io account** - Sign up at [fly.io](https://fly.io)
3. **Supabase project** - For authentication
4. **Environment variables configured**

### Step 1: Login to Fly.io

```bash
fly auth login
```

### Step 2: Create and Configure App

```bash
# Create the app (only run once)
fly apps create regulaease --region jnb

# Set environment variables
fly secrets set REACT_APP_SUPABASE_URL=your_supabase_url
fly secrets set REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
fly secrets set GROQ_API_KEY=your_groq_api_key
```

### Step 3: Deploy

```bash
# Deploy the application
fly deploy

# Monitor deployment
fly logs

# Open in browser
fly open
```

### Step 4: Configure Custom Domain (Optional)

```bash
# Add custom domain
fly certs add your-domain.com

# Add DNS record
# Type: A
# Name: @
# Value: [IP from fly ips list]
```

## 🔧 Configuration Files

### File Structure for Deployment

```
regulaease/
├── Dockerfile              # Multi-stage build
├── fly.toml                # Fly.io configuration
├── frontend/
│   ├── .env.local          # Frontend environment variables
│   └── ...
├── backend/
│   ├── requirements.txt    # Python dependencies
│   └── ...
└── DEPLOYMENT.md           # This file
```

### Environment Variables

#### Frontend (.env.local)
```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

#### Backend (Fly.io Secrets)
```bash
GROQ_API_KEY=your-groq-api-key
PORT=8080
NODE_ENV=production
```

## 🏗️ Build Process

The deployment uses a multi-stage Docker build:

1. **Stage 1**: Build React frontend
   - Install Node.js dependencies
   - Build production React app
   - Output to `build/` directory

2. **Stage 2**: Setup Python backend
   - Install Python dependencies
   - Copy backend code
   - Copy built frontend to `static/`
   - Configure Flask to serve React app

## 🌐 Production Features

### Frontend
- **Optimized React build** with minification
- **Static asset caching** for better performance
- **Service worker** for offline functionality (if configured)

### Backend
- **Production Flask server** with static file serving
- **Health check endpoint** at `/health`
- **API rate limiting** (if needed)
- **Error handling** for production

### Security
- **HTTPS enforcement** via Fly.io
- **CORS configured** for cross-origin requests
- **Environment variables** for sensitive data

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Check app status
fly status

# View logs
fly logs

# Check health endpoint
curl https://your-app.fly.dev/health
```

### Scaling
```bash
# Scale up/down machines
fly scale count 2

# Scale memory
fly scale memory 1024
```

### Updates
```bash
# Deploy updates
fly deploy

# Rollback if needed
fly releases
fly rollback <version>
```

## 🚨 Troubleshooting

### Common Issues

1. **Build failures**
   - Check Dockerfile syntax
   - Verify file paths
   - Review build logs: `fly logs`

2. **Environment variable issues**
   - Verify secrets: `fly secrets list`
   - Check .env.local in frontend

3. **Static file serving**
   - Ensure React build completed
   - Check Flask static folder configuration

4. **Database connection**
   - Verify Supabase URL and keys
   - Check network connectivity

### Debug Commands

```bash
# SSH into running app
fly ssh console

# Check filesystem
fly ssh console -C "ls -la /app"

# View environment variables
fly ssh console -C "printenv"

# Check Python processes
fly ssh console -C "ps aux"
```

## 🔄 CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Fly.io

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup flyctl
      uses: superfly/flyctl-actions/setup-flyctl@master
      
    - name: Deploy to Fly.io
      run: flyctl deploy --remote-only
      env:
        FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## 📈 Performance Optimization

### Frontend
- **Code splitting** with React.lazy()
- **Image optimization** with WebP format
- **Bundle analysis** with webpack-bundle-analyzer

### Backend
- **Gunicorn** for production WSGI server
- **Redis caching** for API responses
- **Database connection pooling**

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit secrets to git
   - Use Fly.io secrets management
   - Rotate keys regularly

2. **HTTPS**
   - Enforced by Fly.io
   - Use secure cookies

3. **CORS**
   - Configure proper origins
   - Restrict to production domains

4. **Rate Limiting**
   - Implement for API endpoints
   - Use Flask-Limiter

## 📱 Mobile Considerations

The app is fully responsive and works on mobile devices:
- **Progressive Web App** capabilities
- **Touch-friendly** interface
- **Offline functionality** (if service worker added)

## 🌍 South African Considerations

- **Data sovereignty** - Deployed in Johannesburg region
- **Local compliance** - POPIA compliance built-in
- **Multi-language** support (English, Afrikaans, Zulu, Xhosa)

## 🆘 Support

For deployment issues:
1. Check Fly.io documentation
2. Review application logs
3. Test locally with Docker
4. Contact support if needed

## 🎯 Success Metrics

After deployment, monitor:
- **Response times** < 200ms
- **Uptime** > 99.9%
- **User authentication** working
- **API endpoints** responsive
- **Static assets** loading correctly 