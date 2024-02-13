import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import { upload } from '../middleware/multer.middleware';

const router = express.Router();

// Route: POST /api/v1/auth/register
router.post('/register', upload.single('avatar'), registerUser);

// Route: POST /api/v1/auth/login
router.post('/login', loginUser);

export default router;
