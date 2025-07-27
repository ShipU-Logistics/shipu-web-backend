import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import { sendMail } from '../utils/nodemail.js';
import { prisma } from '../utils/prismaClient.js';

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


export const createUser = async (req, res, next) => {
  const { name, email, password, phone, } = req.body;
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
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "please fill your name email and password" });
  }
  //check if user's email is already registered or not    
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(409).json({ error: "Email is already registered" });
  }

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, phone, otp, otpExpiry: expiry },
  });

  await sendMail(email, `Your OTP `, `Your OTP is ${otp}`);
  res.json({ error: "OTP sent to your email" });
};


export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findUnique(
    { where: { email } }
  );

  if (user || user.otp !== otp || user.otpExpiry < new Date()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  await prisma.user.update({
    where: { email },
    data: { isVerified: true, otp: null, otpExpiry: null }
  });

  res.json({ error: "email verified and you are registered successfully now you can log in" });
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password is required " });
  }

  const user = await prisma.user.findunique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "provide username" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ error: "please verify your email before logging in" })
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "wrong email or password " });
  }

  const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, cookieOption);
  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
    }
  })
};

//logout 
export const logoutUser = async (req, res, next) => {
  const userId = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'Please provide your user ID' });
  }
  try {
    res.clearCookie('token', cookieOption);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logoutUser', error);
    next(error);
  }
}

//forgot Password 
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const token = JWT.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return res.status(400).json({ error: 'User not found' });
  }
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

