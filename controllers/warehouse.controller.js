import { prisma } from '../utils/prismaClient.js';

export const createWarehouse = async (req, res) => {
  try {
    const { location, capacity } = req.body;
    const warehouse = await prisma.Warehouse.create({
      data: {
        location,
        capacity,
      },
    });
    return res.status(201).json({ message: 'warwhouse created' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//get all warehouses
export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await prisma.Warehouse.findMany();
    return res.status(200).json(warehouses);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//get by id
export const getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await prisma.warehouse.findUnique({
      where: { id: Number(id) },
    });
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' ,success:false});
    }
    return res.status(200).json({message:"warehouse",success:true,data:warehouse});
  } catch (error) {
    return res.status(500).json({ error:error.message,success:false });
  }
};
// update by id
export const updateWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, capacity } = req.body;
    const warehouse = await prisma.warehouse.update({
      where: { id: Number(id) },
      data: { location, capacity },
    });
    return res.status(200).json({ message: 'Warehouse updated', data: warehouse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Delete by Id
export const deleteWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.warehouse.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ message: 'Warehouse deleted successfully', sucess:true});
  } catch (error) {
    return res.status(500).json({ error: error.message,success:false });
  }
};
