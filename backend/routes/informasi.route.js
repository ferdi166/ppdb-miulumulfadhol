import express from 'express';

import {
    getAllInformasi,
    getAllInformasiById,
    createInformasi,
    updateInformasi,
    deleteInformasi
} from '../controllers/informasi.controller.js';

const router = express.Router();

router.get('/', getAllInformasi);
router.get('/:id', getAllInformasiById);
router.post('/', createInformasi);
router.put('/:id', updateInformasi);
router.delete('/:id', deleteInformasi);

export default router;