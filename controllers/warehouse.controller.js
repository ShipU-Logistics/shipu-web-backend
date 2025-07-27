export const createWarehouse = async(req,res)=> {
    try{
        const {location, capacity} = req.body;
        const warehouse = await prisma.warehouse.create({
            data:{
                location:location,
                capacity:capacity,
            },
        });
        res.status(201).json(warehouse);
    } catch(err){
        res.status(500).json({error:"Failed to create Warehouse"});
    }
};
