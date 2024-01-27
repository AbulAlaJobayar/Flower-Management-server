import { Router } from 'express';
import { salesController } from './sales.controller';
import auth from '../../middleware/auth';
// import auth from "../../middleware/auth";

const router = Router();
router.post('/createSale', auth(), salesController.createSalesIntoDB);
router.get('/allSales', salesController.getAllSalesIntoDB);
export const salesRouter = router;
