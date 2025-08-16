import { createWarehouse,deleteWarehouseById,getAllWarehouses,getWarehouseById, updateWarehouseById} from '../controllers/warehouse.controller.js';
import { authenticate, authorizedRole } from '../middleware/auth.js';
import { Router } from 'express';

const warehouseRouter = Router();

warehouseRouter.post('/create', authenticate, authorizedRole('ADMIN'), createWarehouse);
warehouseRouter.get('/get', authenticate, getAllWarehouses);
warehouseRouter.get('/get-warehouse/:id',getWarehouseById);
warehouseRouter.put('/update/:id',authenticate,authorizedRole('ADMIN'),updateWarehouseById)
warehouseRouter.delete('/delete/:id',authenticate,authorizedRole('ADMIN'),deleteWarehouseById)

export default warehouseRouter;
