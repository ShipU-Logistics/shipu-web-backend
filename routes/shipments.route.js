import { createShipments,getAllShipments,getShipmentById,updateShipmentStatus,deleteShipment } from "../controllers/shipments.controller.js";
import { Router } from "express";

const shipmentsRouter = Expression.Router()

shipmentsRouter.post('/',createShipments);
shipmentsRouter.get('/',getAllShipments);
shipmentsRouter.get('/',getShipmentById);
shipmentsRouter.put('/',updateShipmentStatus);
shipmentsRouter.delete('/',deleteShipment);

export default shipmentsRouter;