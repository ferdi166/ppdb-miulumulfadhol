import express from "express";

import {
    createDayaTampung,
    getDayaTampung,
    getDayaTampungById,
    updateDayaTampung,
    deleteDayaTampung
} from '../controllers/daya_tampung.controller.js';

const router = express.Router();

router.post('/', createDayaTampung);
router.get('/', getDayaTampung);
router.get('/:id', getDayaTampungById);
router.put('/:id', updateDayaTampung);
router.delete('/:id', deleteDayaTampung);

export default router;