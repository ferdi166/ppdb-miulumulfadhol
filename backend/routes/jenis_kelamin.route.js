import express from 'express';

import {
    getAllJenisKelamin,
    getJenisKelaminById,
    createJenisKelamin,
    updateJenisKelamin,
    deleteJenisKelamin
} from '../controllers/jenis_kelamin.controller.js';

const router = express.Router();

router.get('/', getAllJenisKelamin);
router.get('/:id', getJenisKelaminById);
router.post('/', createJenisKelamin);
router.put('/:id', updateJenisKelamin);
router.delete('/:id', deleteJenisKelamin);

export default router;