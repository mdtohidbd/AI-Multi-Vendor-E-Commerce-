# Address Management System - Setup & Testing Guide

## ✅ Backend Implementation Complete

Address management system has been fully implemented with database integration.

## 🔧 Setup Steps

### 1. Database Migration
Make sure your Prisma schema is synced with the database:

```bash
npx prisma generate
npx prisma db push
```

### 2. Environment Variables
Ensure these are set in your `.env` file:
- `DATABASE_URL` - Your Neon database connection string
- `DIRECT_URL` - Direct database connection (for migrations)
- Clerk authentication keys

### 3. Start Development Server
```bash
npm run dev
```

## 🧪 Testing the Address System

### Option 1: Test Page (Recommended for debugging)
1. Navigate to: `http://localhost:3000/test-address`
2. Login with Clerk authentication
3. Fill in the test form or use the pre-filled data
4. Click "Test Save Address"
5. Check browser console for detailed logs
6. Click "Refresh Addresses" to see saved addresses

### Option 2: Cart Page (Production flow)
1. Add items to cart
2. Go to cart page: `http://localhost:3000/cart`
3. Scroll to "Payment Summary" section
4. Click "Add New Address" button
5. Fill in the address form
6. Click "SAVE ADDRESS"
7. Address should appear in the delivery address section

## 📁 Files Modified/Created

### API Routes
- `/app/api/address/route.js` - POST, GET, DELETE endpoints for addresses

### Components
- `/components/AddressModal.jsx` - Updated with proper API integration
- `/components/OrderSummary.jsx` - Updated to fetch addresses and place orders

### Redux Store
- `/lib/features/address/addressSlice.js` - Updated with setAddresses, addAddress, removeAddress

### Pages
- `/app/(public)/cart/page.jsx` - Added address fetching on mount
- `/app/(public)/test-address/page.jsx` - Test page for debugging

## 🔍 Troubleshooting

### Issue: "Unauthorized" Error
**Solution:** Make sure you're logged in with Clerk authentication

### Issue: "Failed to save address"
**Possible causes:**
1. Database not connected - Check DATABASE_URL
2. Prisma schema not synced - Run `npx prisma db push`
3. Missing fields - All address fields are required

### Issue: Address not showing after save
**Solution:** 
1. Check browser console for errors
2. Verify Redux store is receiving the address
3. Check network tab for API response

### Issue: Database connection errors
**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Check database connection
npx prisma studio
```

## 📊 Database Schema

```prisma
model Address {
    id        String   @id @default(cuid())
    userId    String
    name      String
    email     String
    street    String
    city      String
    state     String
    zip       String
    country   String
    phone     String
    createdAt DateTime @default(now())
    
    Order Order[]
    user  User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## 🎯 Features Implemented

✅ Save address to database with user authentication
✅ Fetch all addresses for logged-in user
✅ Delete address (API ready, UI can be added)
✅ Auto-select first address in checkout
✅ Switch between multiple addresses
✅ Form validation and error handling
✅ Loading states and user feedback
✅ Redux state management integration
✅ Order placement with selected address

## 🚀 Next Steps (Optional Enhancements)

- [ ] Add address edit functionality
- [ ] Add default address selection
- [ ] Add address delete button in UI
- [ ] Add address search/filter
- [ ] Add Google Maps integration for address autocomplete
- [ ] Add address validation service (Bangladesh postal codes)
- [ ] Add multiple address types (Home, Office, etc.)

## 📝 API Documentation

### POST /api/address
Create a new address
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "street": "123 Main St",
  "city": "Dhaka",
  "state": "Dhaka Division",
  "zip": "1200",
  "country": "Bangladesh",
  "phone": "01712345678"
}
```

### GET /api/address
Get all addresses for logged-in user
```json
{
  "addresses": [...]
}
```

### DELETE /api/address?id={addressId}
Delete a specific address

## 💡 Tips

1. Always check browser console for detailed error messages
2. Use the test page for quick debugging
3. Verify Clerk authentication is working
4. Check Prisma Studio to verify data is being saved
5. Use React DevTools to inspect Redux state

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Button does nothing | Check console for errors, verify API route exists |
| 401 Unauthorized | Login with Clerk |
| 500 Server Error | Check database connection, run Prisma commands |
| Address not in Redux | Verify dispatch is working, check Redux DevTools |
| Form doesn't close | Check setShowAddressModal is being called |

---

Need help? Check the browser console and network tab for detailed error messages.
