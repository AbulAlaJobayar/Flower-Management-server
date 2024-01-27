import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { productSchemaValidation } from './product.validation';
import { productController } from './product.controller';
import auth from '../../middleware/auth';

const router = Router();
router.post(
  '/create-flower',
  auth(),
  validateRequest(productSchemaValidation.productValidation),
  productController.createProductIntoDB,
);
router.get('/get-flower', auth(), productController.getProductIntoDB);
router.get('/:id', auth(), productController.getSingleProductInDB);
router.patch(
  '/:id',
  auth(),
  validateRequest(productSchemaValidation.updateProductValidation),
  productController.updateProductIntoDB,
);
router.delete('/:id', auth(), productController.deleteProductIntoDB);
export const productRouter = router;
