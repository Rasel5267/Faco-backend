"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoute = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var multer_1 = __importDefault(require("multer"));
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.VendorRoute = router;
var storage = multer_1.default.diskStorage({});
var fileFilter = function (_req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        cb(null, true);
    }
    else {
        cb({ msg: "Unsupported File Format" }, false);
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
router.post('/login', controllers_1.VendorLogin);
router.use(middleware_1.Authenticate);
router.get('/profile', controllers_1.GetVendorProfile);
router.patch('/profile', controllers_1.UpdateVendorProfile);
router.patch('/coverimage', upload.single('images'), controllers_1.UpdateVendorCoverImage);
router.patch('/service', controllers_1.UpdateVendorService);
router.post('/food', upload.array('images', 10), controllers_1.AddFood);
router.get('/foods', controllers_1.GetFoods);
//# sourceMappingURL=VendorRoute.js.map