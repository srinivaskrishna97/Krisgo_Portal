# Enterprise Portal

A comprehensive multi-tenant enterprise portal application with authentication, app directory, notifications, and admin features.

## Features

### 1. Authentication & Login
- **Multiple login methods**: Google SSO, Microsoft SSO, Email/Password
- **Session persistence**: SSO across applications
- **Password recovery**: Forgot password functionality
- **Future MFA support**: Framework ready for multi-factor authentication

### 2. Portal Layout
**Top Navigation Bar:**
- Logo and portal branding
- Tenant/Organization switcher (multi-tenant support)
- Global search (apps and future record search)
- Notification bell with unread count
- Profile avatar menu (Profile, Settings, Logout)

**Left Sidebar:**
- Home
- Apps
- Notifications
- Admin (visible only to administrators)

### 3. Home/Landing Page
- Welcome message with user context
- Current tenant/organization display
- Quick stats dashboard
- Alert notifications
- Favorite/pinned apps launcher
- Recently used apps
- Recent activity feed
- Quick links to key functions

### 4. Apps Directory
- Grid view of all available applications
- 5 categories: Operations, Finance, Customer, Tools, Analytics
- 20+ pre-configured applications
- Search and filter functionality
- Favorite/pin apps
- App status badges (Active, Beta, New, Maintenance)
- Deep links to app modules
- Launch applications

### 5. Notifications
- Unified notification center
- 5 notification types: System, Application, Security, Workflow, Approval
- Read/Unread filtering
- Mark as read functionality
- Deep links to relevant app records
- Timestamp with relative time
- Notification categorization

### 6. Profile Management
- User profile information
- Contact details and avatar
- Language and timezone preferences
- Linked login providers (Google/Microsoft)
- Active sessions management
- Password change
- Security settings

### 7. Tenant/Organization Management
- Multiple tenant support
- Tenant switcher in navigation
- Organization profile and branding
- Domain configuration
- Subscription/plan information
- Usage metrics per tenant
- Tenant-specific app access

### 8. Admin Features

**Admin Overview:**
- System statistics and metrics
- Recent activity monitoring
- System alerts
- Service health status

**Users & Permissions:**
- User management interface
- Role-based access control (Admin, User, Developer)
- User search and filtering
- Activity tracking
- User status management

**Tenant Management:**
- Multi-tenant configuration
- Tenant creation and settings
- Usage statistics per tenant
- Active users and apps tracking

**Activity & Audit Logs:**
- Comprehensive activity logging
- User action tracking
- System event logging
- Security event monitoring
- Log filtering and search
- Export functionality

**API & Developer Tools:**
- API key management
- Key visibility toggle
- Usage statistics
- API documentation links
- Webhook configuration
- Rate limit information

**System Settings:**
- Security policies (MFA, password requirements)
- Session timeout configuration
- Authentication provider setup (Google, Microsoft)
- Notification preferences
- SMTP configuration
- Feature toggles
- Environment settings

**Documentation & Help:**
- Knowledge base
- Video tutorials
- Support ticket system
- Searchable documentation
- Category-organized guides

## Technical Stack

- **Frontend Framework**: React 18.3
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Toast Notifications**: Sonner

## Mock Data

The application currently uses mock data for:
- User authentication (any email/password combination works)
- 3 pre-configured tenants
- 20+ categorized applications
- Notification feed
- Activity logs
- User management
- API keys and usage stats

## Getting Started

1. The app starts at the login page (`/login`)
2. Use any of the login methods (all mock authentication)
3. After login, you'll be redirected to the home page
4. Navigate using the sidebar or top navigation

## Default Credentials

Any email/password combination works for demo purposes. Example:
- Email: `john.doe@example.com`
- Password: `password`

Or use the Google/Microsoft SSO buttons (also mock authentication).

## Adding Persistence with Supabase

This application is currently a fully-functional frontend with mock data. To add real persistence, you can integrate Supabase for:

- **Authentication**: Replace mock auth with Supabase Auth (supports Google, Microsoft, email/password)
- **User Management**: Store user profiles and preferences
- **Tenant Data**: Persist tenant/organization information
- **Notifications**: Store and sync notifications across sessions
- **Activity Logs**: Persistent audit trail
- **User Preferences**: Save favorites, recently used apps, settings
- **API Keys**: Secure API key storage and management

### Recommended Supabase Tables:
- `users` - User profiles and metadata
- `tenants` - Organization/tenant information
- `tenant_users` - Many-to-many relationship
- `notifications` - Notification records
- `activity_logs` - Audit trail
- `user_preferences` - Settings and favorites
- `api_keys` - API key management
- `applications` - Dynamic app catalog

## Future Enhancements

- Real SSO integration with Google/Microsoft
- Multi-factor authentication (MFA)
- Cross-application search
- Real-time notifications
- Webhook event system
- Application marketplace
- Custom branding per tenant
- Advanced analytics and reporting
- Mobile responsive optimization
