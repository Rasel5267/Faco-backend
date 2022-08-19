import express from 'express';
import { CreateOrder, CustomerLogin, CustomerSignup, CustomerVerify, EditCustomerProfile, GetCustomerProfile, GetOrderById, GetOrders } from '../controllers';
import { Authenticate } from '../middleware';

const router = express.Router();

// Signup
router.post('/signup', CustomerSignup);
// Login
router.post('/login', CustomerLogin);

// Authentication
router.use(Authenticate);
// verify customer
router.patch('/verify', CustomerVerify);
// Profile
router.get('/profile', GetCustomerProfile);

router.patch('/profile', EditCustomerProfile);

// router.delete('/delete', DeleteCustomerProfile);


// cart

// Order
router.post('/create-order', CreateOrder);
router.get('/orders', GetOrders);
router.get('/order/:id', GetOrderById);

// Payment


export { router as CustomerRoute};