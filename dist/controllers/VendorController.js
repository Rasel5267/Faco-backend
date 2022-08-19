"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFoods = exports.AddFood = exports.UpdateVendorCoverImage = exports.UpdateVendorService = exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VendorLogin = void 0;
var models_1 = require("../models");
var utility_1 = require("../utility");
var cloudinary_1 = __importDefault(require("../utility/cloudinary"));
var AdminController_1 = require("./AdminController");
var VendorLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingVendor, validation, signature;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, AdminController_1.FindVendor)('', email)];
            case 1:
                existingVendor = _b.sent();
                if (!(existingVendor !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, utility_1.ValidatePassword)(password, existingVendor.password, existingVendor.salt)];
            case 2:
                validation = _b.sent();
                if (validation) {
                    signature = (0, utility_1.GenerateSignature)({
                        _id: existingVendor.id,
                        email: existingVendor.email,
                        foodTypes: existingVendor.foodTypes,
                        name: existingVendor.name
                    });
                    return [2 /*return*/, res.json(signature)];
                }
                else {
                    return [2 /*return*/, res.json({ msg: "Password is not valid" })];
                }
                _b.label = 3;
            case 3: return [2 /*return*/, res.json({ msg: "Vendor does not exist with this email ID" })];
        }
    });
}); };
exports.VendorLogin = VendorLogin;
var GetVendorProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, existingVendor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, AdminController_1.FindVendor)(user._id)];
            case 1:
                existingVendor = _a.sent();
                return [2 /*return*/, res.json(existingVendor)];
            case 2: return [2 /*return*/, res.json({ msg: "Vendor info not found" })];
        }
    });
}); };
exports.GetVendorProfile = GetVendorProfile;
var UpdateVendorProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, address, phone, foodTypes, user, existingVendor, saveResult;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, address = _a.address, phone = _a.phone, foodTypes = _a.foodTypes;
                user = req.user;
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, AdminController_1.FindVendor)(user._id)];
            case 1:
                existingVendor = _b.sent();
                if (!(existingVendor !== null)) return [3 /*break*/, 3];
                existingVendor.name = name;
                existingVendor.address = address;
                existingVendor.phone = phone;
                existingVendor.foodTypes = foodTypes;
                return [4 /*yield*/, existingVendor.save()];
            case 2:
                saveResult = _b.sent();
                return [2 /*return*/, res.json(saveResult)];
            case 3: return [2 /*return*/, res.json(existingVendor)];
            case 4: return [2 /*return*/, res.json({ msg: "Vendor info not found" })];
        }
    });
}); };
exports.UpdateVendorProfile = UpdateVendorProfile;
var UpdateVendorService = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, existingVendor, saveResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, AdminController_1.FindVendor)(user._id)];
            case 1:
                existingVendor = _a.sent();
                if (!(existingVendor !== null)) return [3 /*break*/, 3];
                existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                return [4 /*yield*/, existingVendor.save()];
            case 2:
                saveResult = _a.sent();
                return [2 /*return*/, res.json(saveResult)];
            case 3: return [2 /*return*/, res.json(existingVendor)];
            case 4: return [2 /*return*/, res.json({ msg: "Vendor info not found" })];
        }
    });
}); };
exports.UpdateVendorService = UpdateVendorService;
var UpdateVendorCoverImage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, vendor, uploadedFile, error_1, secure_url, public_id, saveResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, AdminController_1.FindVendor)(user._id)];
            case 1:
                vendor = _a.sent();
                if (!(vendor !== null)) return [3 /*break*/, 9];
                if (!vendor.public_id) return [3 /*break*/, 3];
                return [4 /*yield*/, cloudinary_1.default.uploader.destroy(vendor.public_id)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!req.file)
                    return [2 /*return*/, res.json({ msg: "You must need to upload a file" })];
                uploadedFile = void 0;
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, cloudinary_1.default.uploader.upload(req.file.path, {
                        folder: "Faco/Vendors",
                        mediaType: "image"
                    })];
            case 5:
                uploadedFile = _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res.json({ msg: error_1.message })];
            case 7:
                secure_url = uploadedFile.secure_url, public_id = uploadedFile.public_id;
                vendor.coverImage = secure_url;
                vendor.public_id = public_id;
                return [4 /*yield*/, vendor.save()];
            case 8:
                saveResult = _a.sent();
                return [2 /*return*/, res.json(saveResult)];
            case 9: return [2 /*return*/, res.json({ msg: "Something went wrong with add cover image" })];
        }
    });
}); };
exports.UpdateVendorCoverImage = UpdateVendorCoverImage;
var AddFood = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, name_1, description, category, foodTypes, readyTime, price, vendor, files, images, i, FilePath, image, createFood, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 8];
                _a = req.body, name_1 = _a.name, description = _a.description, category = _a.category, foodTypes = _a.foodTypes, readyTime = _a.readyTime, price = _a.price;
                return [4 /*yield*/, (0, AdminController_1.FindVendor)(user._id)];
            case 1:
                vendor = _b.sent();
                if (!(vendor !== null)) return [3 /*break*/, 8];
                files = req.files;
                if (!files)
                    return [2 /*return*/, res.json({ msg: "You must need to upload at least one file" })];
                images = [];
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < req.files.length)) return [3 /*break*/, 5];
                FilePath = req.files[i].path;
                return [4 /*yield*/, cloudinary_1.default.uploader.upload(FilePath, {
                        folder: "Faco/Foods",
                        mediaType: "image"
                    })];
            case 3:
                image = _b.sent();
                images.push(image.secure_url);
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, models_1.Food.create({
                    vendorId: vendor._id,
                    name: name_1,
                    description: description,
                    category: category,
                    foodTypes: foodTypes,
                    images: images,
                    readyTime: readyTime,
                    price: price,
                    rating: 0
                })];
            case 6:
                createFood = _b.sent();
                vendor.foods.push(createFood);
                return [4 /*yield*/, vendor.save()];
            case 7:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
            case 8: return [2 /*return*/, res.json({ msg: "Something went wrong with add food" })];
        }
    });
}); };
exports.AddFood = AddFood;
var GetFoods = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, foods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.Food.find({ vendorId: user._id })];
            case 1:
                foods = _a.sent();
                if (foods !== null) {
                    return [2 /*return*/, res.json(foods)];
                }
                return [2 /*return*/, res.json({ msg: "Food Not Available right now" })];
            case 2: return [2 /*return*/, res.json({ msg: "Foods info not found" })];
        }
    });
}); };
exports.GetFoods = GetFoods;
//# sourceMappingURL=VendorController.js.map