import { prisma} from '../utils/prismaClient.js';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientRustPanicError
} from '@prisma/client/runtime/library';


export const createShipment = async (req,res)=>{
    try{
        const {trackingId,origin,destination,weight,status,userId,warehouseId,vehicleId}=req.body;

        if(!trackingId || !origin || !destination || !weight || !userId || !warehouseId || !vehicleId) {
            return res.status(400).json({error:"All required fields must be provided "});
       }
        const shipment = await prisma.shipment.create({
            data: {
                trackingId,
                origin,
                destination,
                weight,
                status,
                userId,
                warehouseId,
                vehicleId,
            },
        });
        res.status(201).json({message:"shipment created successfully",shipment});
    } catch(error){
        if (error instanceof prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                return res.status(409).json({ error: "Shipment with this tracking ID already exists." });
            }
       }
        console.error("Error in creating shipment",error);
        return res.status(500).json({error:"Internal server error"});
    }
};