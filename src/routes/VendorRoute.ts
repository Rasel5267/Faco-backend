import express from 'express';
import { AddFood, GetFoods, GetVendorProfile, UpdateVendorCoverImage, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers';
import multer from 'multer';
import { Authenticate } from '../middleware';

const router = express.Router();

const storage = multer.diskStorage({});

const fileFilter = (_req: any, file: any, cb: any) => {
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
	file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp'){
		cb(null, true)
	}
	else{
		cb({ msg: "Unsupported File Format"}, false)
	}
}

let upload = multer({
	storage,
	fileFilter: fileFilter
})

router.post('/login', VendorLogin);

router.use(Authenticate);
router.get('/profile', GetVendorProfile);
router.patch('/profile', UpdateVendorProfile);
router.patch('/coverimage', upload.single('images'), UpdateVendorCoverImage);
router.patch('/service', UpdateVendorService);

router.post('/food', upload.array('images', 10), AddFood);
router.get('/foods', GetFoods);

export { router as VendorRoute};