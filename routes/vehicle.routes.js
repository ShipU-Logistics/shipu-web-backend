import { createVehicle } from "../controllers/vehicle.controller.js";
import { authenticate, authorizedRole } from "../middleware/auth.js";
import { Router } from "express";

const vehicleRouter = Router();

vehicleRouter.post('/create-vehicle', authenticate, authorizedRole('ADMIN'), createVehicle);

export default vehicleRouter;