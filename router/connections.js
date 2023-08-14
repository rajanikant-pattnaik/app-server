import express from 'express'
import { disConnect, getAll, makeConnect } from '../controllers/connections.js';
// import { disconnect } from 'mongoose';

const router=express.Router();

router.post('/make',makeConnect)
router.post('/unmake',disConnect)
router.get('/getConnect',getAll)

export default router;