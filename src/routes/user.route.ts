import express from 'express';
import { registerUser } from '../controllers/user.controller';
import { upload } from '../middleware/multer.middleware';

const router = express.Router();

// Route: POST /api/v1/auth/register
router.post('/register', upload.single('avatar'), registerUser);

export default router;
