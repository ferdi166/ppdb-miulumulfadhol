import express from 'express';

import {
    getAllJadwalPendaftaran,
    getJadwalPendaftaranById,
    createJadwalPendaftaran,
    updateJadwalPendaftaran,
    deleteJadwalPendaftaran
} from '../controllers/jadwal_pendaftaran.controller.js';

const router = express.Router();

router.get('/', getAllJadwalPendaftaran);
router.get('/:id', getJadwalPendaftaranById);
router.post('/', createJadwalPendaftaran);
router.put('/:id', updateJadwalPendaftaran);
router.delete('/:id', deleteJadwalPendaftaran);

export default router;