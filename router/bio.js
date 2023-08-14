import express from 'express'
import { isAuthentcated } from '../middlewareAuth.js';
import { addAndEdit } from '../controllers/bios.js';

const router=express.Router();

router.post('/add&edit',isAuthentcated,addAndEdit)
export default router;