# 🌸 SPA Service Management System

A comprehensive SPA service management system built with .NET 8 and React, providing complete management solutions for spa and wellness centers.

## 📋 Overview

SPA Service Management System is a full-stack web application designed to manage all operations of a spa center, from appointment booking, service management, staff and customer management to reporting and revenue analysis.

## ✨ Key Features

### 🎯 Customer Management
- Customer registration and information management
- Membership system and loyalty points
- Service usage history
- Customer feedback and reviews

### 📅 Appointment Management
- Online appointment booking
- Staff schedule management
- Automatic room and resource allocation
- Notifications and reminders

### 💼 Service Management
- Diverse spa service catalog
- Price and duration management
- Service packages and combos
- Service usage statistics tracking

### 👥 Staff Management
- Personal information and expertise
- Work schedules and shifts
- Attendance tracking and performance monitoring
- Commission system

### 🛍️ Cosmetic Product Management
- Cosmetic product catalog
- Shopping cart and online payment
- Order and delivery management
- Inventory tracking

### 🏢 Facility Management
- Floor and room management
- Room categorization by service type
- Room usage history

### 📊 Reports and Analytics
- Overview dashboard
- Revenue reports by time period
- Popular service statistics
- Staff performance analysis

### 🔐 User Role Management
- **Admin**: Full system management
- **Manager**: Spa operations management
- **Employee**: Service execution and status updates
- **Customer**: Booking and service usage

## 🛠️ Technology Stack

### Backend (.NET 8)
- **Framework**: ASP.NET Core Web API
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: JWT + Google OAuth
- **Email Service**: MailKit
- **Payment Gateway**: VNPay integration
- **Architecture**: Repository Pattern + Dependency Injection

### Frontend (React)
- **Framework**: React 18 with TypeScript
- **UI Library**: 
  - Radix UI components
  - Tailwind CSS
  - CoreUI
  - Ant Design (AntD)
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation
- **Calendar**: Schedule-X
- **Maps**: React Leaflet
- **Charts**: Recharts
- **Animations**: Framer Motion

### DevOps & Deployment
- **Containerization**: Docker
- **Build Tools**: Webpack
- **Code Quality**: ESLint, Prettier, Stylelint

## 🏗️ System Architecture

```
SpaService/
├── SpaServiceBE/                 # Backend .NET 8
│   ├── SpaServiceBE/             # Web API Project
│   ├── Repositories/             # Data Access Layer
│   │   ├── Context/              # Entity Framework DbContext
│   │   ├── Entities/             # Domain Models
│   │   └── DTO/                  # Data Transfer Objects
│   ├── Services/                 # Business Logic Layer
│   └── SpaServiceUnitTest/       # Unit Tests
├── spaservicefe/                 # Frontend React
│   ├── public/                   # Static assets
│   ├── src/                      # Source code
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page components
│   │   └── utils/                # Utility functions
│   └── nginx/                    # Nginx configuration
├── DB scripts/                   # Database scripts
└── docs/                         # Documentation
```

## 🗄️ Data Model

The system includes main entities:

- **Account**: User accounts
- **Customer**: Customer information
- **Employee**: Staff information
- **Manager**: Management information
- **SpaService**: Spa services
- **ServiceCategory**: Service categories
- **Appointment**: Appointments
- **Request**: Service requests
- **Room**: Service rooms
- **Floor**: Building floors
- **CosmeticProduct**: Cosmetic products
- **Order**: Product orders
- **Transaction**: Payment transactions
- **Feedback**: Customer feedback

## 🚀 Installation and Setup

### System Requirements
- .NET 8 SDK
- Node.js (v18 or higher)
- SQL Server
- Docker (optional)

### Backend Setup

1. **Clone repository**
```bash
git clone https://github.com/mineduck1608/SpaService.git
cd SpaService
```

2. **Configure database**
```bash
cd SpaServiceBE/SpaServiceBE
# Update connection string in appsettings.json
# Run migrations
dotnet ef database update
```

3. **Run backend**
```bash
dotnet run
```

API will run at: `https://localhost:7000`

### Frontend Setup

1. **Install dependencies**
```bash
cd spaservicefe
npm install
```

2. **Run development server**
```bash
npm start
```

Frontend will run at: `http://localhost:3000`

### Run with Docker

```bash
# Build and run entire system
docker-compose up --build
```

## 📱 User Interfaces

### Customer
- Homepage with service introduction
- Service and product catalog
- Online appointment booking
- Profile and history management
- Shopping cart and checkout

### Admin/Manager
- Overview dashboard
- Customer and staff management
- Service and product management
- Reports and analytics
- System configuration

### Employee
- Work schedule view
- Service status updates
- Attendance tracking
- Commission view

## 🔧 Configuration

### Backend Configuration
Update `appsettings.json` file:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "your-sql-server-connection-string"
  },
  "JwtSettings": {
    "Key": "your-jwt-secret-key",
    "Issuer": "SpaService",
    "Audience": "SpaService"
  },
  "GoogleSettings": {
    "ClientId": "your-google-client-id"
  },
  "VnPaySettings": {
    "TmnCode": "your-vnpay-tmn-code",
    "HashSecret": "your-vnpay-hash-secret"
  }
}
```

### Frontend Configuration
Update environment variables in `.env`:

```env
REACT_APP_API_URL=https://localhost:7000/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🧪 Testing

### Backend Tests
```bash
cd SpaServiceBE/SpaServiceUnitTest
dotnet test
```

### Frontend Tests
```bash
cd spaservicefe
npm test
```

## 📊 API Documentation

API documentation can be accessed at: `https://localhost:7000/swagger`

### Main endpoints:

- `/api/auth` - Authentication & Authorization
- `/api/customers` - Customer management
- `/api/employees` - Employee management
- `/api/services` - Service management
- `/api/appointments` - Appointment management
- `/api/orders` - Order management
- `/api/transactions` - Transaction management
- `/api/reports` - Reports and analytics

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Team

- **Frontend Developer**: React, TypeScript, UI/UX
- **Backend Developer**: .NET 8, Entity Framework, API Design
- **Database Designer**: SQL Server, Data Modeling
- **DevOps Engineer**: Docker, Deployment, CI/CD

## 📞 Contact

- **Repository**: [https://github.com/mineduck1608/SpaService](https://github.com/mineduck1608/SpaService)
- **Issues**: [https://github.com/mineduck1608/SpaService/issues](https://github.com/mineduck1608/SpaService/issues)

---

⭐ **If you find this project useful, please give us a star!** ⭐