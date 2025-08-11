import {prisma} from '../utils/prismaClient.js';

export const createWarehouse = async (req,res)=>{
    try {
        const {location,capacity}=req.body;
        const warehouse = await prisma.Warehouse.create({
            data:{
                location,
                capacity,
            },
        });
        return res.status(201).json({message:"warwhouse created"});
    } catch(error){
        return res.status(500).json({error:"error in creating warehouse"});
    }
};