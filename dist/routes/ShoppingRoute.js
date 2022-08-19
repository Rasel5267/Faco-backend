"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var router = express_1.default.Router();
exports.ShoppingRoute = router;
// Food Availability
router.get('/:pinCode', controllers_1.GetFoodAvailability);
// Top Restaurants
router.get('/top-restaurants/:pinCode', controllers_1.GetTopRestaurants);
// Foods available in 30 minutes
router.get('/foods-in-30-min/:pinCode', controllers_1.GetFoodsIn30Min);
// Search Food
router.get('/search/:pinCode', controllers_1.SearchFoods);
// Find Restaurant By ID
router.get('/restaurant/:id', controllers_1.RestaurantID);
//# sourceMappingURL=ShoppingRoute.js.map