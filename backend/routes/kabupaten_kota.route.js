import express from 'express';

import {
    getAllKabupatenKota,
    getKabupatenKotaById,
    getKabupatenKotaByProvinsi
} from '../controllers/kabupaten_kota.controller.js';

const router = express.Router();

router.get('/', getAllKabupatenKota);
router.get('/:id', getKabupatenKotaById);
router.get('/provinsi/:provinsiId', getKabupatenKotaByProvinsi);

export default router;