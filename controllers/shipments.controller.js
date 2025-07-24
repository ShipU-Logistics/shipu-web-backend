
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
                Transportation:true,
            }
        });
        res.status(200).json(shipments);
    } catch (error) {
        console.log('Error in getAllShipments', error);
        res.status(500).json({ error: 'Internal Server Error'});
        next(error);
    }
};

export const getShipmentById = async (req,res,next)=>{
    try{
        const{id} = req.params;
        const shipment = await prisma.shipment.findUnique({
        include: {
            user:true,
            warehouse:true,
            vehicle:true,
            Transportation:true,
        },
    });
    if(!shipment) return res.status(404).json({error: 'shipment not found'}); 
    }
    catch(err){
        res.status(500).json({error:'facing error in shipment'});
    }
};
export const updateShipmentStatus = async(req,res,next)=> {
    try{
        const {id} = req.params;
        const{status}= req.body;

        const updated = await prisma.shipment.update({
            where:{id:parseInt(id)},
            data:{status},
        });
        res.json({shipment:updated});
    } catch(err){
        res.status(500).json({error:'error in updating shipment status'})
    }
};

export const deleteShipment = async(req,res,next)=>{
    try {
        const {id} = req.params;

        await prisma.shipment.delete({
            where:{id:parseInt(id)},
        });
        res.json({message:'shipments deleted successfully'});
    } catch(err){
        res.status(500).json({error:'error in deleting shipments'});
    }
}