import { Router } from "express";
const router = Router();
import { lostItems } from "../controllers/items.controllers.js";
import { foundItems,lostItemCategory,foundItemCategory } from "../controllers/items.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";


// routes for Items info 
router.route('/lost-items').get(lostItems);
router.route('/found-items').get(foundItems);
router.route('/lost-items/:category').get(lostItemCategory);
router.route('/found-items/:category').get(lostItemCategory);



  



const itemRouter = router;
export {itemRouter}