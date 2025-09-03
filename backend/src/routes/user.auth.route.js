import express from 'express'
import { signup,login,logout } from '../controllers/auth.controller.js';
import protectRoute from '../middlewares/protectRoute.middleware.js'
const router=express.Router()

router.post('/user/signup',signup)
router.post('/user/login',login)
router.post('/user/logout',protectRoute,logout)



export default router;