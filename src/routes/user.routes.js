import { Router } from "express";
const router = Router();
import {loginUser,signUpUser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";


// user router

router.route('/signUp').post(upload.none(),signUpUser)
router.route('/login').post(upload.none(),loginUser);















const userRouter = router;

export{userRouter}