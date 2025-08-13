import { prisma } from '../utils/prismaClient.js';

export const createVehicle = async (req, res) => {
  try {
    if(req.user.role!=='ADMIN'){
      return res.status(403).json({ message:"Access denied"});
    }
    const { type, numberPlate, driverName, status } = req.body;

    if(!type || !numberPlate || !driverName ||!status ){
      return res.status(400).json({message:"All fields are required"});
    }
    const vehicle = await prisma.vehicle.create({
      data: {
        type,
        numberPlate,
        driverName,
        status,
      },
    });
    return res.status(201).json({ message: 'vehicle created', success: true });
  } catch (error) {
    return res.status(500).json({ message: 'error in creating vehicle',success:false });
  }
};

//Get All Vehicles by admin and user both

export const getAllVehicles = async (req,res)=>{
  try{
    const vehicles = await prisma.vehicle.findMany({
      include:{shipments:true,Transportation:true}
    });
    return res.status(201).json({message:"get all vehicles",success:true,data:vehicles});
  }catch(error){
    return res.status(500).json({message:error,success:false});
  }
};

//get vehicles by id

export const getVehicleById = async (req,res) => {
  try{
    const{id}=req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where:{id:parseInt(id)},
      include:{
        shipments:true,
        Transportation:true,
      }
    });
    if(!vehicle){
      return res.status(404).json({message:"Vehicle not found",success:false});
    }
    return res.status(201).json({message:"get single vehicle by id",success:true,data:vehicle});
  }catch(error){
      return res.status(500).json({message:error,success:false});
  }
}

// Update Vehicle by ID

/*export const updateVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, numberPlate, driverName, status } = req.body;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(id) },
    });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found", success: false });
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: {
        type,
        numberPlate,
        driverName,
        status,
      },
    });
    return res.status(200).json({ message: "Vehicle updated successfully", success: true, data: updatedVehicle });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
};*/
