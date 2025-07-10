import prisma from '../prisma/client.js';

export const createShipments = async (req, res, next) =>{
    try{
        const{trackingId,origin,destination,weight,status,userId,warehouseId,vehicleId}=req.body;
        const shipments = await prisma.shipments.create({
            data:{
                trackingId:trackingId,
                origin: origin,
                destination: destination,
                weight : weight,
                status: status,
                userId: userId,
                warehouseId: warehouseId,
                vehicleId: vehicleId,
            },
        });
        res.status(201).json(shipments);
    } catch (error) {
        console.log('Error in createShipments', error);
        res.status(500).json({ error: 'Internal Server Error'});
        next(error);
    }
}
export const getAllShipments = async (req, res, next)=> {
    try {
        const shipments = await prisma.shipments.findMany({
            include: {
                user: true,
                warehouse: true,
                vehicle: true,
            }
        });
        res.status(200).json(shipments);
    } catch (error) {
        console.log('Error in getAllShipments', error);
        res.status(500).json({ error: 'Internal Server Error'});
        next(error);
    }
}