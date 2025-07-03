# Supabase Authentication Setup Guide

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Environment Variables Setup

Create a `.env.local` file in the `frontend` directory with the following variables:

```bash
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** → Use for `REACT_APP_SUPABASE_URL`
   - **Project API Key** (anon/public) → Use for `REACT_APP_SUPABASE_ANON_KEY`

## Example Configuration

```bash
REACT_APP_SUPABASE_URL=https://abc123xyz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyM3h5eiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc0NTQ4Njg4LCJleHAiOjE5OTAxMjQ2ODh9...
```

## Authentication Features

The RegulaEase application now includes:

- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In)
- ✅ Password Reset
- ✅ User Profile Management
- ✅ Password Change
- ✅ Responsive Authentication UI
- ✅ Dark Mode Support

## User Profile Data

The authentication system stores the following user metadata:
- First Name
- Last Name
- Business Name (optional)
- Business Type (optional)

## Security Features

- Secure authentication with Supabase Auth
- Password validation (minimum 6 characters)
- Email verification
- Protected routes and components
- Session management with auto-refresh

## Testing Authentication

1. Start your development server: `npm start`
2. Click "Sign Up" in the header
3. Fill out the registration form
4. Check your email for verification
5. Sign in with your credentials
6. Access your profile settings from the user menu

## Deployment

For production deployment, make sure to:
1. Set up your environment variables in your hosting platform
2. Configure Supabase authentication settings
3. Set up proper email templates in Supabase
4. Configure redirect URLs for password reset

## Troubleshooting

### Common Issues:

1. **Missing environment variables**: Make sure `.env.local` is in the frontend directory
2. **Invalid credentials**: Double-check your Supabase project URL and API key
3. **CORS errors**: Ensure your domain is configured in Supabase Auth settings
4. **Email not sending**: Configure SMTP settings in Supabase Auth

### Need Help?

- Check the [Supabase Auth documentation](https://supabase.com/docs/guides/auth)
- Review the [React integration guide](https://supabase.com/docs/guides/getting-started/tutorials/with-react) 