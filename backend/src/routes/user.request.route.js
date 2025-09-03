import express from 'express'
import { acceptRequest, getFriends, getUsers, onBoard, rejectRequest, sendRequest } from "../controllers/user.controller.js";
import protectRoute from '../middlewares/protectRoute.middleware.js';
const router=express.Router();
 

router.post('/user/on-board',protectRoute,onBoard);
router.post('/user/send-request/:id',protectRoute,sendRequest)
router.post('/user/accept-request/:id',protectRoute,acceptRequest)
router.post('/user/reject-request/:id',protectRoute,rejectRequest)
router.get('/user/allusers',protectRoute,getUsers)
router.get('/user/friends',protectRoute,getFriends)

export default router;