# MODERNO — Fashion & Apparel Ecommerce

Fullstack ecommerce platform built with Next.js 14, NestJS, and PostgreSQL.

```
moderno/
├── client/          # Next.js 14 frontend (App Router)
└── server/          # NestJS backend + PostgreSQL
```

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | Next.js 14, TypeScript, Tailwind CSS    |
| State     | Zustand                                 |
| Backend   | NestJS, TypeORM                         |
| Database  | PostgreSQL 15                           |
| Auth      | JWT + Passport.js                       |
| Docker    | docker-compose (DB + server + client)   |

---

## Quick Start

### Option A — Docker (recommended)

```bash
# Clone and start everything
docker-compose up -d

# Seed the database (first time only)
docker-compose exec server npm run seed
```

- Frontend → http://localhost:3000  
- Backend API → http://localhost:3001/api  
- Database → localhost:5432

---

### Option B — Local Development

**Prerequisites:** Node 18+, PostgreSQL running locally

#### 1. Database

```bash
psql -U postgres -c "CREATE DATABASE moderno_db;"
```

#### 2. Backend (server)

```bash
cd server

# Copy and configure env
cp .env.example .env
# Edit .env with your DB credentials if needed

# Install & run
npm install
npm run start:dev

# Seed data (in a new terminal)
npm run seed
```

Server runs on → http://localhost:3001/api

#### 3. Frontend (client)

```bash
cd client

# Install & run
npm install
npm run dev
```

Frontend runs on → http://localhost:3000

---

## Default Accounts

After seeding:

| Role     | Email                  | Password   |
|----------|------------------------|------------|
| Admin    | admin@moderno.com      | admin123   |

Register any email for a customer account.

---

## API Endpoints

### Auth
```
POST   /api/auth/register     — Create account
POST   /api/auth/login        — Login → returns JWT
```

### Products (public)
```
GET    /api/products          — List with filter/pagination
GET    /api/products/featured — Featured products
GET    /api/products/:id      — Single product
POST   /api/products          — Create (admin only)
PUT    /api/products/:id      — Update (admin only)
DELETE /api/products/:id      — Soft delete (admin only)
```

Query params: `?category=women|men|accessories|sale&search=...&page=1&limit=12&sort=price`

### Cart (auth required)
```
GET    /api/cart              — Get cart
POST   /api/cart              — Add item { productId, quantity, size?, color? }
PUT    /api/cart/:id          — Update quantity
DELETE /api/cart/:id          — Remove item
DELETE /api/cart              — Clear cart
```

### Orders (auth required)
```
GET    /api/orders            — My orders
GET    /api/orders/:id        — Order detail
POST   /api/orders            — Checkout from cart { shippingAddress, promoCode? }
PUT    /api/orders/:id/status — Update status (admin only)
```

### Admin (admin only)
```
GET    /api/admin/dashboard   — Stats: revenue, orders, products, customers
GET    /api/admin/orders      — All orders with pagination
GET    /api/admin/customers   — All customers
```

### Users (auth required)
```
GET    /api/users/me          — My profile
PATCH  /api/users/me          — Update profile
```

---

## Promo Codes

| Code        | Discount         |
|-------------|------------------|
| MODERNO10   | 10% off subtotal |

Free shipping on orders ≥ Rp 500.000

---

## Project Structure

### Backend (`server/src/`)

```
auth/           — JWT auth, login, register
users/          — User entity + service
products/       — Product CRUD + filtering
cart/           — Cart management per user
orders/         — Order creation + status
admin/          — Dashboard + admin APIs
common/
  guards/       — JwtAuthGuard, RolesGuard
  decorators/   — @Roles()
seed.ts         — Database seeder
```

### Frontend (`client/src/`)

```
app/
  page.tsx              — Homepage (hero, featured, categories)
  products/
    page.tsx            — Product listing + filters
    [id]/page.tsx       — Product detail + add to cart
  auth/
    login/page.tsx      — Login form
    register/page.tsx   — Register form
  checkout/page.tsx     — Checkout + order summary
  orders/page.tsx       — Order history
  admin/page.tsx        — Admin dashboard
components/
  layout/Navbar.tsx     — Sticky navbar + user menu
  cart/CartDrawer.tsx   — Slide-in cart panel
  product/ProductCard.tsx — Product grid card
lib/api.ts              — Axios instance + JWT interceptor
store/
  auth.store.ts         — Auth state (Zustand + persist)
  cart.store.ts         — Cart state (Zustand)
types/index.ts          — TypeScript interfaces
```

---

## Environment Variables

### Server `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=moderno_db
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Client `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Features

- **Auth** — Register, login, JWT tokens, role-based access (admin/customer)
- **Products** — Browse, search, filter by category, sort, pagination
- **Cart** — Add/remove/update, persist per user, live count in navbar
- **Checkout** — Shipping form, promo codes, order summary, free shipping threshold
- **Orders** — Order history with status tracking
- **Admin** — Revenue stats, order management, status updates
- **Design** — Modern minimalist, Cormorant Garamond + DM Sans, monochrome palette
