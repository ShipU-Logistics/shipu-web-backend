import { prisma } from '../utils/prismaClient.js';

export const createVehicle = async (req, res) => {
  try {
    const { type, numberPlate, driverName, status } = req.body;
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
    return res.status(500).json({ error: 'error in creating vehicle' });
  }
};
