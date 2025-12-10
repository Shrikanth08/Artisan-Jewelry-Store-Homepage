# Backend Integration Setup Guide

Your React frontend is now fully integrated with the Python Flask backend! Follow these steps to get everything running.

## 🚀 Quick Start

### 1. Start Your Python Backend

Make sure your Flask backend is running on `http://localhost:5000`

```bash
# In your backend directory
python app.py
```

The backend should be accessible at: `http://localhost:5000/api`

### 2. Configure API URL (Optional)

If your backend runs on a different URL/port, update the API_URL in `/services/api.ts`:

```typescript
const API_URL = 'http://localhost:5000/api';  // Change this if needed
```

### 3. Enable CORS on Backend

Make sure your Flask backend has CORS enabled. In your `app.py`:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This should already be there
```

### 4. Start Your React Frontend

```bash
npm install  # If you haven't already
npm run dev
```

## 🎯 Features Now Connected to Backend

### ✅ Authentication
- **Register**: New users can create accounts
- **Login**: Users can login with email/password
- **JWT Tokens**: Automatic token management in localStorage
- **Profile**: User profile data synced with backend

### ✅ Products
- **Fetch All Products**: Loads from backend database
- **Search**: Real-time search queries sent to backend
- **Filter by Category**: Category filtering via API

### ✅ Shopping Cart
- **Add to Cart**: Products added to user's cart in database
- **Update Quantity**: Increase/decrease item quantities
- **Remove Items**: Delete items from cart
- **Cart Count**: Live cart item count in header
- **View Cart Modal**: See all cart items with total

### ✅ Wishlist
- **Add to Wishlist**: Save favorite products
- **Persistent Storage**: Wishlist saved in database
- **Auth Required**: Must be logged in

## 📡 API Endpoints Being Used

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products?search=query` - Search products
- `GET /api/products?category=Necklaces` - Filter by category

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order from cart

## 🔐 Authentication Flow

1. User clicks **User icon** in header
2. **AuthModal** opens with Login/Register form
3. On success, JWT token saved to `localStorage`
4. Token automatically included in all API requests
5. User can logout by clicking User icon again

## 🛒 Shopping Flow

1. Browse products loaded from backend
2. Click **cart icon** on product card to add to cart
3. Cart count updates in header
4. Click **shopping bag icon** to view cart
5. Adjust quantities or remove items
6. Click **Checkout** (ready for order creation)

## 🔧 Testing the Integration

### Test Authentication
1. Click User icon → Register
2. Create account: name, email, password
3. You should be logged in automatically
4. Click User icon to see your name and logout option

### Test Cart
1. Make sure you're logged in
2. Click cart icon on any product
3. Should see "Added to cart!" alert
4. Cart count should increase in header
5. Click shopping bag icon to view cart modal

### Test Search
1. Type in hero search bar
2. Products filter in real-time
3. Search query sent to backend

## 🐛 Troubleshooting

### "Failed to load products"
- ✅ Check if Flask backend is running
- ✅ Verify backend is on `http://localhost:5000`
- ✅ Check browser console for CORS errors
- ✅ Run `python seed_database.py` to add sample products

### "Please login to add items"
- ✅ Click User icon and login/register first
- ✅ Check if JWT token exists in localStorage

### CORS Errors
- ✅ Add CORS to Flask: `CORS(app)` in app.py
- ✅ Install flask-cors: `pip install flask-cors`

### Cart count not updating
- ✅ Make sure you're logged in
- ✅ Check Network tab for API responses
- ✅ Try refreshing the page

## 📝 Environment Variables (Backend)

Create `.env` file in your backend directory:

```env
DATABASE_URL=postgresql://localhost/jewelry_store
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
FLASK_ENV=development
```

## 🎨 Customization

### Change Backend URL
Edit `/services/api.ts`:
```typescript
const API_URL = 'https://your-production-api.com/api';
```

### Add More Features
All API functions are in `/services/api.ts`:
- `authAPI` - Authentication functions
- `productsAPI` - Product operations
- `cartAPI` - Cart management
- `ordersAPI` - Order handling
- `wishlistAPI` - Wishlist operations

## 🚢 Production Deployment

### Frontend
- Update `API_URL` to production backend URL
- Build: `npm run build`
- Deploy to Vercel/Netlify

### Backend
- Deploy Flask to Heroku/Railway/AWS
- Set environment variables
- Enable HTTPS
- Update CORS settings for production domain

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Flask terminal for backend errors
3. Verify all endpoints return expected data
4. Test with Postman/curl first

---

**Your jewelry store is now fully connected! 🎉**

Users can register, login, browse products, add to cart, and manage their wishlist - all backed by your Python/Flask database.
