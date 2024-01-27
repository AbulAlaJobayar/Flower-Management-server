import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { productSchemaValidation } from "./product.validation";
import { productController } from "./product.controller";

const router=Router()
router.post('/create-flower',validateRequest(productSchemaValidation.productValidation),productController.createProductIntoDB)
router.get('/get-flower',productController.getProductIntoDB)
router.get('/:id',productController.getSingleProductInDB)
router.patch('/:id')
router.delete('/:id')
export const productRouter=router