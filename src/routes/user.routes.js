import { Router } from "express";
const router = Router();
import {signUpUser} from "../controllers/user.controller.js"



// user router

router.route('/signUp').post(signUpUser)
router.route('/login').get((req,res)=>{
    res.send("hello")
})















const userRouter = router;

export{userRouter}