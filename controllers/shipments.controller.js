import { prisma } from '../utils/prismaClient.js';

export const createShipment = async (req, res) => {
  try {
    const { trackingId, origin, destination, weight, status, userId, warehouseId, vehicleId } =
      req.body;

    if (
      !trackingId ||
      !origin ||
      !destination ||
      !weight ||
      !userId ||
      !warehouseId ||
      !vehicleId
    ) {
      return res.status(400).json({ error: 'All required fields must be provided ' });
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
    res.status(201).json({ success: true, message: 'shipment created successfully', shipment });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get all shipments
export const getAllShipments = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany();
    res.status(200).json({message:"get all the shipments", success:true, data:shipments });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get by id
export const getShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: Number(id) },
    });
    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }
    res.status(200).json({message:"get shipments",success: true, data:shipment });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//update by id
export const updateShipmentById = async (req, res) => {
  const { id } = req.params;
  const { trackingId, origin, destination, weight, status, userId, warehouseId, vehicleId } =
    req.body;

  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: Number(id) },
    });
    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }

    const updatedShipment = await prisma.shipment.update({
      where: { id: Number(id) },
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
    res.status(200).json({ success: true, message: 'Shipment updated successfully', data: updatedShipment });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
