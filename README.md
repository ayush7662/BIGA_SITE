# BIG A - Society Marketplace (MERN)

Full-stack MERN marketplace with customer and shopkeeper roles, inspired by Amazon/Myntra style UX.

## Tech Stack
- Frontend: React + Vite, React Router, Axios, React Hot Toast
- Backend: Node.js, Express, MongoDB + Mongoose
- Auth: JWT
- Uploads: Multer + Cloudinary

## Folder Structure
```
BIGA/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      server.js
  frontend/
    src/
      components/
      context/
      pages/
      services/
      App.jsx
      main.jsx
```

## Setup

### 1) Backend
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Set environment values in `backend/.env`:
- `MONGO_URI`
- `JWT_SECRET`
- `PAYMENT_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 2) Frontend
```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

## Core User Flow
- Landing page for new users
- Signup with role (`customer`/`shopkeeper`) and success toast
- Login with JWT and redirect to homepage
- Homepage with navbar, search, filters, and product grid
- Product details + ratings/reviews
- Customer: cart, checkout, orders, order tracking, wishlist
- Shopkeeper: add/delete products, receive orders, update order status

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (shopkeeper)
- `PUT /api/products/:id` (shopkeeper owner)
- `DELETE /api/products/:id` (shopkeeper owner)
- `POST /api/products/:id/reviews` (customer)

### Cart (customer)
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart`

### Orders
- `POST /api/orders` (customer checkout)
- `GET /api/orders/customer`
- `GET /api/orders/shopkeeper`
- `PUT /api/orders/:id/status` (shopkeeper)

### Wishlist (customer)
- `GET /api/wishlist`
- `POST /api/wishlist/toggle`

## Notes
- Backend startup requires a valid `MONGO_URI` and other env keys.
- `PAYMENT_KEY` is scaffolded for payment integration hooks.
- Real-time notifications are optional and can be extended via Socket.io later.
