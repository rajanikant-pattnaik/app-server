import express from 'express'
import { disConnect, getAll, makeConnect } from '../controllers/connections.js';
import { isAuthentcated } from '../middlewareAuth.js';
// import { disconnect } from 'mongoose';

const router=express.Router();

router.post('/make',isAuthentcated,makeConnect)
router.post('/unmake',isAuthentcated,disConnect)
router.get('/getConnect',isAuthentcated,getAll)

export default router;