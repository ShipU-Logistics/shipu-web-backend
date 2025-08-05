import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtpViaTwilio = async (phone) => {
  return await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
      to: `+91${phone}`, 
      channel: 'sms',
    });
};

export const verifyOtpViaTwilio = async (phone, otp) => {
  return await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
      to: `+91${phone}`, // fixed backticks
      code: otp,         // 'code' is the correct key, not 'otp'
    });
};
