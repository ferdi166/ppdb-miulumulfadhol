import express from 'express';

import {
    getAllJenjangAsalSekolah,
    getJenjangAsalSekolahById,
    createJenjangAsalSekolah,
    updateJenjangAsalSekolah,
    deleteJenjangAsalSekolah
} from '../controllers/jenjang_asal_sekolah.controller.js';

const router = express.Router();

router.get('/', getAllJenjangAsalSekolah);
router.get('/:id', getJenjangAsalSekolahById);
router.post('/', createJenjangAsalSekolah);
router.put('/:id', updateJenjangAsalSekolah);
router.delete('/:id', deleteJenjangAsalSekolah);

export default router;
