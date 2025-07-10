import prisma from '../utils/prismaClient.js';
import bcrypt from 'bcryptjs';


export const createUser = async (req, res, next) => {
  const { name, email, password, phone,} = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        phone: phone,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in createUser', error);
    next(error);
  }
};
//register user
export const registerUser = async (req, res, next) => {
  const {name, email,password} = req.body;
  
  if(!name || !email || !password) {
    return 
    res.status(400).json({error: "please fill your name email and password" });
  }
  //check if user's email is already registered or not    
  const existingUser = await prisma.user.findunique({
    where: {email},
  });
  if(existingUser) {
    return 
    res.status(401).json({ error: "Email is already registered" });
  }

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data:{name, email, password:hashedPassword},
  });
}




export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findmany({
      include: {
        shipments: true,
        shipmentsSent: true,
        shipmentsRecieved: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log('Error in getAllUsers', error);
    next(error);
  }
};

