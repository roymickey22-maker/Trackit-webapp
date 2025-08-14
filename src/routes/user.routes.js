import { Router } from "express";
const router = Router();
import {signUpUser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";


// user router

router.route('/signUp').post(upload.none(),signUpUser)
router.route('/login').get((req,res)=>{
    res.send("hello")
})















const userRouter = router;

export{userRouter}