"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.CustomerRoute = router;
// Signup
router.post('/signup', controllers_1.CustomerSignup);
// Login
router.post('/login', controllers_1.CustomerLogin);
// Authentication
router.use(middleware_1.Authenticate);
// verify customer
router.patch('/verify', controllers_1.CustomerVerify);
// Profile
router.get('/profile', controllers_1.GetCustomerProfile);
router.patch('/profile', controllers_1.EditCustomerProfile);
//# sourceMappingURL=CustomerRoute.js.map