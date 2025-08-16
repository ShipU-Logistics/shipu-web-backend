import express from 'express';
import { createShipment,getAllShipments,getShipmentById, updateShipmentById } from '../controllers/shipments.controller.js';
import { Router } from 'express';
import { authenticate, authorizedRole } from '../middleware/auth.js';
const shipmentRouter = Router();

shipmentRouter.post('/create',authenticate,authorizedRole('ADMIN'), createShipment);
shipmentRouter.get('/getAll',authenticate,getAllShipments);
shipmentRouter.get('/getById/:id',authenticate,getShipmentById);
shipmentRouter.put('/update/:id',authenticate,authorizedRole('ADMIN'),updateShipmentById);

export default shipmentRouter;
