# Vouch

**Guaranteed Authentic Luxury Resale Platform**

Vouch is a comprehensive marketplace platform for buying and selling authenticated high-value branded items. The platform integrates third-party authentication services, secure escrow payments, and provides both mobile and web applications for a complete user experience.

## 🌟 Features

### Core Functionality
- **User Authentication & Profiles**: Secure user registration, login, and profile management
- **Product Listing Management**: Create, edit, and manage luxury item listings
- **Third-Party Authentication**: Integration with professional authentication services (Entrupy)
- **Secure Escrow Payments**: Stripe Connect integration for secure transactions
- **Multi-Platform**: Cross-platform mobile app (React Native) and responsive web application (Next.js)
- **Shipping Integration**: Support for USPS, FedEx, and UPS shipping carriers

### Security & Trust
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcrypt password hashing
- **Transaction Escrow**: Payments held in escrow until delivery confirmation
- **Item Authentication**: Professional third-party authentication for all items
- **User Verification**: Account verification system

## 🏗️ Architecture

### Monorepo Structure
```
vouch/
├── backend/          # Node.js + Express API server
├── web/             # Next.js web application
├── mobile/          # React Native mobile app
└── package.json     # Root workspace configuration
```

### Technology Stack

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT tokens with bcrypt
- **Payment Processing**: Stripe Connect
- **External APIs**: Entrupy (authentication), shipping carriers

#### Web Application
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **API Communication**: Axios

#### Mobile Application
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Storage**: Expo SecureStore
- **Cross-Platform**: iOS and Android support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (for production)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/naserhaneef-source/Vouch.git
   cd Vouch
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Environment Setup**
   
   **Backend** (`backend/.env`):
   ```env
   NODE_ENV=development
   PORT=3001
   DATABASE_URL=postgresql://localhost:5432/vouch_db
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ENTRUPY_API_KEY=your_entrupy_api_key
   ENTRUPY_API_URL=https://api.entrupy.com
   ```

   **Web** (`web/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev:backend
   ```
   Server runs on http://localhost:3001

2. **Start the web application**
   ```bash
   npm run dev:web
   ```
   Web app runs on http://localhost:3000

3. **Start the mobile app**
   ```bash
   npm run dev:mobile
   ```
   Follow Expo CLI instructions for device/simulator

#### Production Build

```bash
npm run build
```

## 📱 Application Features

### Web Application
- **Landing Page**: Feature overview and call-to-action
- **Authentication**: Login and registration forms
- **Product Catalog**: Browse authenticated luxury items with filters
- **User Dashboard**: Manage listings, purchases, and profile
- **Sell Interface**: Create new product listings
- **Responsive Design**: Mobile-friendly interface

### Mobile Application
- **Tab Navigation**: Home, Products, Profile screens
- **Authentication Flow**: Secure login/logout
- **Product Browsing**: Native mobile experience
- **User Profile**: Account management
- **Cross-Platform**: iOS and Android support

### Backend API

#### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Product Endpoints
- `GET /api/products` - List products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (owner only)
- `DELETE /api/products/:id` - Remove product (owner only)

#### Transaction Endpoints
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/my-transactions` - User transactions
- `GET /api/transactions/:id` - Single transaction
- `PATCH /api/transactions/:id/status` - Update status

#### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔌 Integrations

### Payment Processing (Stripe Connect)
- **Escrow System**: Payments held until delivery confirmation
- **Connected Accounts**: Seller account management
- **Payment Intents**: Secure payment processing
- **Refund Handling**: Automated refund processing

### Authentication Services
- **Entrupy Integration**: Professional item authentication
- **Status Tracking**: Real-time authentication status updates
- **Webhook Support**: Automated status notifications
- **Multiple Providers**: Extensible for additional services

### Shipping Integration
- **Multi-Carrier Support**: USPS, FedEx, UPS
- **Rate Comparison**: Best shipping options
- **Label Generation**: Automated shipping labels
- **Tracking**: Real-time shipment tracking

## 🗄️ Database Schema

### Core Models

#### User
- `id` (UUID) - Primary key
- `email` (String) - Unique user email
- `password` (String) - Encrypted password
- `firstName`, `lastName` (String) - User name
- `phone` (String) - Contact number
- `isVerified` (Boolean) - Account verification status
- `stripeCustomerId`, `stripeAccountId` (String) - Payment integration

#### Product
- `id` (UUID) - Primary key
- `title`, `description` (String) - Product details
- `brand`, `category` (String) - Classification
- `condition` (Enum) - Item condition
- `price`, `originalPrice` (Decimal) - Pricing
- `images` (Array) - Product photos
- `authenticityStatus` (Enum) - Authentication status
- `sellerId` (UUID) - Foreign key to User

#### Transaction
- `id` (UUID) - Primary key
- `productId`, `buyerId`, `sellerId` (UUID) - Foreign keys
- `amount` (Decimal) - Transaction amount
- `status` (Enum) - Transaction status
- `stripePaymentIntentId` (String) - Payment reference
- `shippingInfo` (JSON) - Shipping details

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Web Application Testing
```bash
cd web
npm test
```

### API Testing
Health check endpoint:
```bash
curl http://localhost:3001/api/health
```

## 🚢 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy to cloud platform (AWS, Heroku, etc.)
4. Run database migrations

### Web Application Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Configure environment variables

### Mobile Application Deployment
1. Build for production: `expo build`
2. Submit to App Store / Google Play Store

## 🔧 Development Roadmap

### Phase 1: MVP (Current)
- [x] Core backend API with authentication
- [x] Web application with essential features
- [x] Mobile app structure and navigation
- [x] Basic integration frameworks

### Phase 2: Enhanced Features
- [ ] Complete mobile app UI/UX
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] User messaging system
- [ ] Admin dashboard

### Phase 3: Scale & Optimize
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] International shipping
- [ ] Multiple currencies
- [ ] AI-powered recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@vouch.com or join our Slack channel.

---

**Built with ❤️ for the luxury resale community**