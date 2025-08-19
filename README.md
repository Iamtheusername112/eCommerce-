# 🛍️ ShopHub - Full-Stack Ecommerce Platform

A modern, production-ready ecommerce platform built with Next.js 14, featuring a beautiful frontend, comprehensive admin dashboard, and robust backend infrastructure.

## ✨ **Features**

### **Frontend (Customer)**

- 🎨 Modern, responsive design with Tailwind CSS
- 🛒 Shopping cart functionality
- ❤️ Wishlist management
- 🔍 Advanced product search and filtering
- 📱 Mobile-first responsive design
- ⭐ Product reviews and ratings
- 💳 Secure checkout process

### **Admin Dashboard**

- 📊 Real-time analytics and statistics
- 📦 Product management (CRUD operations)
- 🏷️ Category management
- 📋 Order management and fulfillment
- 👥 Customer management
- 📈 Sales reports and insights
- ⚙️ System settings and configuration

### **Backend Infrastructure**

- 🗄️ **Database**: Neon PostgreSQL with Drizzle ORM
- 🔐 **Authentication**: Clerk for secure user management
- 💳 **Payments**: Stripe integration
- 🚀 **API**: RESTful API with Next.js API routes
- 🔒 **Security**: Role-based access control
- 📊 **Validation**: Zod schema validation

## 🚀 **Tech Stack**

### **Frontend**

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks + Server Components

### **Backend**

- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **Validation**: Zod
- **Forms**: React Hook Form

### **Development Tools**

- **Package Manager**: npm
- **Database Migrations**: Drizzle Kit
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🏗️ **Project Structure**

```
src/
├── app/                    # Next.js app router
│   ├── admin/             # Admin dashboard routes
│   │   ├── products/      # Product management
│   │   ├── categories/    # Category management
│   │   ├── orders/        # Order management
│   │   └── customers/     # Customer management
│   ├── api/               # API routes
│   │   ├── products/      # Products API
│   │   ├── categories/    # Categories API
│   │   ├── cart/          # Shopping cart API
│   │   └── orders/        # Orders API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── admin/             # Admin-specific components
│   └── ecommerce/         # Ecommerce components
├── lib/                   # Utility functions
│   ├── db/                # Database configuration
│   │   ├── index.ts       # Database connection
│   │   └── schema.ts      # Database schema
│   └── utils.ts           # Common utilities
└── middleware.ts          # Clerk authentication middleware
```

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Neon PostgreSQL database
- Clerk account for authentication
- Stripe account for payments

### **1. Clone and Install**

```bash
git clone <repository-url>
cd ecommerce-frontend
npm install
```

### **2. Environment Setup**

Create a `.env.local` file with your configuration:

```env
# Database
DATABASE_URL="your_neon_database_url_here"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### **3. Database Setup**

```bash
# Generate database migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open database studio (optional)
npm run db:studio
```

### **4. Start Development Server**

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

## 🔐 **Authentication Setup**

### **Clerk Configuration**

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Configure your sign-in/sign-up URLs
4. Add your Clerk keys to `.env.local`

### **Admin Access**

To access the admin dashboard:

1. Sign up with Clerk
2. Manually update your user role to 'admin' in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 💳 **Payment Setup**

### **Stripe Configuration**

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add your Stripe keys to `.env.local`
4. Configure webhook endpoints for order processing

## 📊 **Database Schema**

The application includes comprehensive database tables for:

- **Users**: Customer and admin accounts
- **Products**: Product catalog with variants
- **Categories**: Product categorization
- **Orders**: Customer orders and fulfillment
- **Cart Items**: Shopping cart management
- **Reviews**: Product ratings and feedback
- **Coupons**: Discount management

## 🎯 **Key Features**

### **Customer Experience**

- Browse products by category
- Advanced search and filtering
- Add items to cart and wishlist
- Secure checkout process
- Order tracking
- Product reviews

### **Admin Management**

- Product catalog management
- Order fulfillment
- Customer insights
- Inventory management
- Sales analytics
- System configuration

## 🚀 **Deployment**

### **Vercel (Recommended)**

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Other Platforms**

- Netlify
- AWS Amplify
- Docker containerization

## 🔧 **Development Commands**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database operations
npm run db:generate    # Generate migrations
npm run db:migrate     # Run migrations
npm run db:studio      # Open database studio
```

## 📱 **Responsive Design**

The app is built with a mobile-first approach:

- **Mobile**: Single column layout, collapsible navigation
- **Tablet**: Two-column product grid, expanded navigation
- **Desktop**: Four-column product grid, full navigation

## 🔒 **Security Features**

- **Authentication**: Clerk-based user management
- **Authorization**: Role-based access control
- **Data Validation**: Zod schema validation
- **SQL Injection Protection**: Drizzle ORM
- **CSRF Protection**: Built-in Next.js protection

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🙏 **Acknowledgments**

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Clerk for authentication services
- Stripe for payment processing
- Neon for database hosting
- Drizzle for the excellent ORM

---

Built with ❤️ for modern ecommerce

**Ready to launch your online store?** 🚀✨
