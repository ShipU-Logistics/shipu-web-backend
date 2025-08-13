import express from 'express';
import { createShipment } from '../controllers/shipments.controller.js';
import { Router } from 'express';
import { authenticate, authorizedRole } from '../middleware/auth.js';
const shipmentRouter = Router();

shipmentRouter.post('/create',authenticate,authorizedRole('ADMIN'), createShipment);

export default shipmentRouter;
