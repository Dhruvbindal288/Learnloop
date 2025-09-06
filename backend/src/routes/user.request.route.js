import express from 'express'
import { acceptRequest, getFriends, getUsers, onBoard, rejectRequest, sendRequest ,getRequests} from "../controllers/user.controller.js";
import protectRoute from '../middlewares/protectRoute.middleware.js';
const router=express.Router();
 

router.post('/on-board',protectRoute,onBoard);
router.post('/send-request/:id',protectRoute,sendRequest)
router.post('/accept-request/:id',protectRoute,acceptRequest)
router.post('/reject-request/:id',protectRoute,rejectRequest)
router.get('/allusers',protectRoute,getUsers)
router.get('/friends',protectRoute,getFriends)
router.get('/requests',protectRoute,getRequests)


export default router;