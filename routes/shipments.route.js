import { createShipments,getAllShipments,getShipmentById,updateShipmentStatus,deleteShipment } from "../controllers/shipments.controller.js";
import { Router } from "express";

const shipmentsRouter = Router()

shipmentsRouter.post('/createshipment',createShipments);
shipmentsRouter.get('/getall',getAllShipments);
shipmentsRouter.get('/getshipment',getShipmentById);
shipmentsRouter.put('/update',updateShipmentStatus);
shipmentsRouter.delete('/delete',deleteShipment);

export default shipmentsRouter;