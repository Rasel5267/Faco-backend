import { SENDER_EMAIL, PASSWORD  } from "../config";
import nodemailer from 'nodemailer';

// Email


// Notification

// OTP
export const GenerateOtp = () => {
	const otp = Math.floor(100000 + Math.random() * 900000)
	let expiry = new Date()
	expiry.setTime(new Date().getTime() + (30 * 60 *1000))

	return { otp, expiry }
}


export const onRequestOTP = async (otp: Number, email: string) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: SENDER_EMAIL,
			pass: PASSWORD
		}
	});

	const mailOption = {
		from: SENDER_EMAIL,
		to: email,
		subject: 'Verify Your Faco Account.',
		html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Faco Shop.</h2>
            <p>Congratulations! You're almost set to start using FACO✮SHOP.</p>
			<p>Your verification code is ${otp}</p>
            </div>
        `
	}
	
	transporter.sendMail(mailOption, (error: any, response: any) => {
		if(error) return error;
		return response;
	} )
}

// Payment Notification