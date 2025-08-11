import { createWarehouse } from "../controllers/warehouse.controller.js";
import { authenticate, authorizedRole } from "../middleware/auth.js";
import { Router } from "express";

const warehouseRouter = Router();

warehouseRouter.post('/create-warehouse',authenticate,authorizedRole('ADMIN'),createWarehouse);

export default warehouseRouter;