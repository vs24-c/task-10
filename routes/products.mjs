import Controller from "../controller/productsController.mjs";
import ValidateSchem from "../validate/validateSchem.mjs";
import uploud from "../utils/uploudManager.mjs";
import { Router } from "express";
import checkPermissions from '../midleware/auth.mjs';

const router = Router();

router.post('/',checkPermissions, Controller.getProductsList);

router.get('/', Controller.getProductsList) 

router.post(
  '/add/:id?',
  checkPermissions,
  uploud.single('imageSrc'),
  ValidateSchem.prodValidate,
  Controller.addProduct
);

router.get('/add/:id?',checkPermissions, Controller.getAddProductForm);

router.delete('/:id',checkPermissions, Controller.deleteProduct)

export default router;
