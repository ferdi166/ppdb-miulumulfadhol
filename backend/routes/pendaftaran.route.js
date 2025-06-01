import express from 'express';

import {
    getAllPendaftaran,
    getPendaftaranById,
    createPendaftaran,
    updatePendaftaran,
    deletePendaftaran,
    konfirmasiPenerimaan,
    getPendaftaranDiterima,
    getPendaftaranBelumDiterima,
    getPendaftaranByUserId,
    uploadDokumen,
    getTotalPendaftaran,
    getTotalPendaftaranDiterima,
    checkKuotaPendaftaran
} from '../controllers/pendaftaran.controller.js';

import {
    uploadDocument,
    handleMulterError
} from '../config/multer.config.js';

import { VerifyTokens } from '../middleware/VerifyTokens.js';
import { AuthorizeAdminKepsek } from '../middleware/AuthorizeAdminKepsek.js';
import { AuthorizePendaftar } from '../middleware/AuthorizePendaftar.js';
import { AuthorizeAdmin } from '../middleware/AuthorizeAdmin.js';

const router = express.Router();

router.get('/', VerifyTokens, AuthorizeAdminKepsek, getAllPendaftaran);
router.post('/', createPendaftaran);
router.get('/total-pendaftar', getTotalPendaftaran);
router.get('/total-pendaftar-diterima', getTotalPendaftaranDiterima);
router.get('/check-kuota', checkKuotaPendaftaran);
router.get('/diterima', getPendaftaranDiterima); 
router.get('/belum-diterima', VerifyTokens, AuthorizeAdmin, getPendaftaranBelumDiterima);
router.get('/user/:id_user', VerifyTokens, AuthorizePendaftar, getPendaftaranByUserId);
router.get('/:id', getPendaftaranById);
router.put('/:id', uploadDocument, handleMulterError, updatePendaftaran);
router.put('/konfirmasi-penerimaan/:id', konfirmasiPenerimaan);
router.put('/upload-dokumen/:id', uploadDocument, handleMulterError, uploadDokumen);
router.delete('/:id', deletePendaftaran);

export default router;