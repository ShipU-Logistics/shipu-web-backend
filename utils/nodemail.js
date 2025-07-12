import nodemailer from 'nodemailer';
export const sendMail = async(to, Subject, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: false,
        service:"Gmail",
        auth:{user:process.env.SMPT_EMAIl, pass:process.env.SMPT_PASS}
    })
}