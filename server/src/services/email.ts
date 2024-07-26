import nodemailer from "nodemailer";
import { IEmailOptions } from "../types/email.interface";

export const sendMail = (options: IEmailOptions) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_SENDER,
		to: options.email,
		subject: options.subject,
		[options.type === "html" ? "html" : "text"]: options.message,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			throw new Error(error.message);
		} else {
			return info.response;
		}
	});
};
