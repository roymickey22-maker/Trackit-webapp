import { Router } from "express";
const router = Router();
import { lostItems } from "../controllers/items.controllers.js";
import { foundItems,lostItemCategory,foundItemCategory } from "../controllers/items.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";


// routes for Items info 
router.route('/lost-items').get(verifyjwt,lostItems);
router.route('/found-items').get(verifyjwt,foundItems);
router.route('/lost-items/:category').get(verifyjwt,lostItemCategory);
router.route('/found-items/:category').get(verifyjwt,foundItemCategory);



  



const itemRouter = router;
export {itemRouter}