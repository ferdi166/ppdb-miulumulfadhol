import express from 'express';

import {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    editPassword
} from '../controllers/user.controller.js';

import {
    uploadUser,
    handleMulterError
} from '../config/multer.config.js';

import { VerifyTokens } from '../middleware/VerifyTokens.js';
import { AuthorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();

router.get('/', VerifyTokens, AuthorizeAdmin, getAllUser);
// router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', uploadUser.single('foto'), handleMulterError, createUser);
router.put('/:id', uploadUser.single('foto'), handleMulterError, updateUser);
router.put('/edit-password/:id', editPassword);
router.delete('/:id', deleteUser);

export default router;
