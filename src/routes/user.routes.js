import { Router } from "express";
const router = Router();
import {loginUser,signUpUser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import {postItem } from "../controllers/user.controller.js";

// user router


router.route('/signUp').post(upload.none(),signUpUser)
router.route('/login').post(upload.none(),loginUser);
router.route('/auth/refreshAccessToken').post(refreshAccessToken);
router.route('/logout').post(verifyjwt,logoutUser);
router.route('/postItems').post(
  verifyjwt,
  upload.fields([
    {
      name: "ImageTrackList", 
      maxCount: 2
    }
  ]),
  postItem
);














const userRouter = router;

export{userRouter}