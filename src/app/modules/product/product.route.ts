import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { productSchemaValidation } from "./product.validation";
import { productController } from "./product.controller";

const router=Router()
router.post('/Create',validateRequest(productSchemaValidation.productValidation),productController.createProductIntoDB)
router.get('/')
router.delete('/delete')
router.delete('/delete')
export const productRouter=router