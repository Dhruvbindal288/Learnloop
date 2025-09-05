import express from 'express'
import { sendMessage,getMessages } from '../controllers/message.coontroller.js';
import protectRoute from '../middlewares/protectRoute.middleware.js';
const router=express.Router();

router.get('/:receiverId',protectRoute,getMessages)
router.post('/:receiverId',protectRoute,sendMessage)



export default router;