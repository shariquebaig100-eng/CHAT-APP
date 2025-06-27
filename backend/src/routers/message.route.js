import express from 'express';
import { getUsersForSidebar } from '../controller/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages } from '../controller/message.controller.js';
import { sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/chat/:receiverId", protectRoute, getMessages)
router.post("/send/:receiverId", protectRoute, sendMessage)

export default router;