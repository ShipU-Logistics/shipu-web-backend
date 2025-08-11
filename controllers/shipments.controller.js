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
