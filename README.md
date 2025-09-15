# Sampark Jyoti - Client Website

A web-based client interface for the Sampark Jyoti platform, designed for PC users to access job opportunities and agricultural marketplace features.

## Features

### 🏠 Home Dashboard
- Personalized welcome based on user type (Agent/Regular User)
- Quick action cards for main features
- Statistics overview
- Recent jobs and products display

### 💼 Job Management
- Browse available job opportunities
- Advanced search and filtering
- Job categories and work types
- Detailed job information
- Application system

### 🛒 Market Place
- Agricultural products marketplace
- Buy and sell products
- Price tracking
- Product categories

### 👤 User Management
- User registration and authentication
- Profile management
- Agent and regular user accounts
- Role-based access control
-Smart Location matching 
### 🤝 Agent Features
- Agent dashboard
- Worker profile creation
- Worker management
- Job posting capabilities

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Icons**: Font Awesome
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

### Installation

1. Navigate to the client website directory:
```bash
cd client-website
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
client-website/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Navbar.tsx       # Top navigation
│   │   └── Sidebar.tsx      # Side navigation
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Dashboard home
│   │   ├── JobsPage.tsx     # Job listings
│   │   ├── MarketPage.tsx   # Marketplace
│   │   ├── ProfilePage.tsx  # User profile
│   │   ├── LoginPage.tsx    # Login form
│   │   └── RegisterPage.tsx # Registration form
│   ├── services/            # API services
│   │   ├── api.ts           # Axios configuration
│   │   ├── authService.ts   # Authentication API
│   │   ├── jobService.ts    # Jobs API
│   │   └── productService.ts # Products API
│   ├── store/               # Redux store
│   │   ├── store.ts         # Store configuration
│   │   └── slices/          # Redux slices
│   │       ├── authSlice.ts
│   │       ├── jobsSlice.ts
│   │       └── productsSlice.ts
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── index.tsx            # App entry point
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## API Integration

The client website integrates with the existing Sampark Jyoti backend API:

- **Authentication**: `/api/auth/*`
- **Jobs**: `/api/jobs/*`
- **Products**: `/api/products/*`
- **Users**: `/api/users/*`

## User Roles

### Regular Users
- Browse and apply for jobs
- Buy/sell agricultural products
- Manage profile
- Post job opportunities
- List products for sale

### Agents
- All regular user features
- Create and manage worker profiles
- Agent dashboard
- Worker management tools

## Development

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update routing in `App.tsx`
4. Add API services in `src/services/`
5. Update Redux store if needed

### Styling
- Use Styled Components for component-specific styles
- Follow the existing design system
- Use consistent color scheme (#1976D2 primary blue)

## Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service
3. Ensure the backend API is accessible from the deployed domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Sampark Jyoti platform.