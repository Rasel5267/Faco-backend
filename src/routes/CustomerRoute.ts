import express from 'express';
import { CustomerLogin, CustomerSignup, CustomerVerify, EditCustomerProfile, GetCustomerProfile } from '../controllers';
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

// Payment


export { router as CustomerRoute};