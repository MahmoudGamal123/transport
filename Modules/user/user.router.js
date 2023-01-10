import { Router } from "express";
// import { auth } from '../../middelwear/auth.js'
// import { validation } from '../../middelwear/validation.js';
// import * as validators from './user.validation.js'
import * as User_Controller from "./controller/user.js"
const router = Router();

router.patch("/softdelete",User_Controller.softdelete);
router.patch("/updatepassword",User_Controller.updatePassword);
router.patch("/block-account",User_Controller.blockAccount);
router.get("/", User_Controller.getAllUsers);

export default router;