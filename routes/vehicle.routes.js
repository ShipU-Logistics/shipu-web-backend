import { createVehicle, getAllVehicles, getVehicleById, updateVehicleById } from '../controllers/vehicle.controller.js';
import { authenticate, authorizedRole } from '../middleware/auth.js';
import { Router } from 'express';

const vehicleRouter = Router();

vehicleRouter.post('/create', authenticate, authorizedRole('ADMIN'), createVehicle);
vehicleRouter.get('/get',authenticate,getAllVehicles);
vehicleRouter.get('/getAll/:id',authenticate,getVehicleById);
vehicleRouter.put('/update',authenticate,authorizedRole('ADMIN'),updateVehicleById);

export default vehicleRouter;
