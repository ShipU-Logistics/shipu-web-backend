import express from 'express';
import { createShipment } from '../controllers/shipments.controller.js';
import { Router } from 'express';
const shipmentRouter = Router();

shipmentRouter.post('/create', createShipment);

export default shipmentRouter;
