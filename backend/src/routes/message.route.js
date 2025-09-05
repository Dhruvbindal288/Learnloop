import express from 'express'
import { sendMessage,getMessages } from '../controllers/message.coontroller';
import protectRoute from '../middlewares/protectRoute.middleware';
const router=express.Router();

router.get('/:receiverId',protectRoute,getMessages)
router.post('/:receiverId',protectRoute,sendMessage)



export default router;