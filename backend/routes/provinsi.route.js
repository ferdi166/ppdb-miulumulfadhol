import express from 'express';

import {
    getAllProvinsi,
    getProvinsiById
} from '../controllers/provinsi.controller.js';

const router = express.Router();

router.get('/', getAllProvinsi);
router.get('/:id', getProvinsiById);

export default router;