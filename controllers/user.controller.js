import prisma from '../prisma.js';

export const getAllUsers = async (req , res ,next) => {
    try{
        const users = await prisma.user.findmany({
            include: {
                shipments: true,
                shipmentsSent: true,
                shipmentsRecieved: true
            }
        });
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getAllUsers",error)
        next(error);
    }
    };
export const createUser = async (req, res, next) => {
    const {name, email, password, phone, address,city,state,role} = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name :    name,
                email:    email,
                password: password,
                phone:    phone,
                address:  address,
                city:     city,
                state:    state,
                role:     role
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error in createUser",error)
        next(error);
    
    }
}