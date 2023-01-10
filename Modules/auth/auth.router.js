import { Router } from "express";
import { validation } from '../../middelwear/validation.js'
import * as Auth_controller from './contoller/auth.js'
import * as validators from './auth.validation.js'

const router = Router();

router.post("/signup", Auth_controller.signup);
router.get("/confirmEmail/:token",Auth_controller.confirmEmail
  );

  router.post("/signin",Auth_controller.login);

export default router;

//validation(validators.signup),
//validation(validators.confirmEmail),
//validation(validators.signin),