import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prismaClient.js';
import { generateToken } from '../utils/generateToken.js';
import { sendOtpViaTwilio, verifyOtpViaTwilio } from '../utils/nodemail.js';

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Register user 
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    // Check for existing email or phone
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ error: "Email is already registered." });
      }
      if (existingUser.phone === phone) {
        return res.status(409).json({ error: "Phone number is already registered." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

        const token = generateToken(user);
    if (!token) {
      return res.status(402).json({
        message: 'Token not generated',
        success: false,
        error: true,
      });
    }
    res.cookie('token', token, cookieOption);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email/Phone and password are required." });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: email }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken(user);
    if (!token) {
      return res.status(402).json({
        message: 'Token not generated',
        success: false,
        error: true,
      });
    }
    res.cookie('token', token, cookieOption);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export const sendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
    }

    const response = await sendOtpViaTwilio(phone);

    return res.status(200).json({
      message: 'OTP sent successfully',
      sid: response.sid,
      to: response.to,
      status: response.status,
    });
  } catch (error) {
    console.error('OTP send error:', error);
    return res.status(500).json({ error: 'Failed to send OTP', detail: error.message });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required.' });
    }

    const verification = await verifyOtpViaTwilio(phone, otp);

    if (verification.status === 'approved') {
      return res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ error: 'Failed to verify OTP', detail: error.message });
  }
};


export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, city, state } = req.body;

    if (!address || !city || !state) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        address,
        city,
        state,
      },
    });

    return res.status(200).json({
      message: "Address updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
      },
    });
  } catch (err) {
    console.error("Address update error:", err);
    return res.status(500).json({ error: "Failed to update address", detail: err.message });
  }
};

