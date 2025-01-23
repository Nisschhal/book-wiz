// import { Resend } from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `http://localhost:3000/auth/verify-email?token=${token}`

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Confirm your email",
//     html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
//   })
// }

import nodemailer from "nodemailer";
import config from "./config";

// Configuration
const senderEmail = process.env.SENDER_EMAIL; // Replace with your email
const senderPassword = process.env.SENDER_PASSWORD; // Replace with your Gmail App Password

const DOMAIN =
  process.env.NODE_ENV !== "production"
    ? config.env.apiEndpoint
    : config.env.prodApiEndpoint;

enum EmailType {
  Verification = "Verification",
  Reset = "Reset",
  TwoFactor = "TwoFactor",
}

/**
 *Sends email, either confirm or reset
 * @param email - Sends email to given address
 * @param token - Token is used to create link
 * @param type - Check either email is verify or reset
 * @returns - returns info of email sent
 */
export const sendWelcomeEmail = async (email: string, fullName: string) => {
  try {
    // Step 1: Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: senderEmail, // Your email
        pass: senderPassword, // Your app password
      },
    });

    // Step 2: Email content
    const mailOptions = {
      from: `"BookWiz" <${senderEmail}>`, // Sender address
      to: email, // Recipient address
      subject: `Welcome ${fullName}`, // Subject line
      html: `<p>Congrats on signin up!</p>`, // HTML content
    };

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return;
  }
};
/**
 *Sends email, either confirm or reset
 * @param email - Sends email to given address
 * @param token - Token is used to create link
 * @param type - Check either email is verify or reset
 * @returns - returns info of email sent
 */
export const sendCheckinEmail = async (email: string, fullName: string) => {
  try {
    // Step 1: Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: senderEmail, // Your email
        pass: senderPassword, // Your app password
      },
    });

    // Step 2: Email content
    const mailOptions = {
      from: `"BookWiz" <${senderEmail}>`, // Sender address
      to: email, // Recipient address
      subject: `Time to read next book! ${fullName}`, // Subject line
      html: `<p>How is your day going? Check out new books in the library.`, // HTML content
    };

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return;
  }
};

/**
 *Sends email, either confirm or reset
 * @param email - Sends email to given address
 * @param token - Token is used to create link
 * @param type - Check either email is verify or reset
 * @returns - returns info of email sent
 */
const sendEmail = async (
  email: string,
  token: string,
  type: EmailType = EmailType.Verification,
) => {
  try {
    const confirmLink = `${DOMAIN}/auth/${
      type === EmailType.Verification ? "verify-email" : "new-password"
    }?token=${token}`;

    // Step 1: Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: senderEmail, // Your email
        pass: senderPassword, // Your app password
      },
    });

    // Step 2: Email content
    const mailOptions = {
      from: `"Next Auth" <${senderEmail}>`, // Sender address
      to: email, // Recipient address
      subject: `${
        type === EmailType.Verification
          ? "Verify Your Email"
          : "Reset your password"
      }`, // Subject line
      text: `Your ${type} token is: ${token}`, // Plain text
      html: `<p> Click <a href="${confirmLink}">here</a> to ${
        type === EmailType.Verification
          ? "verify your email"
          : "change your password"
      }</p>`, // HTML content
    };

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return;
  }
};

// Verification Email
export async function sendVerificationEmail(email: string, token: string) {
  const info = await sendEmail(email, token);
}

// Reset Email
export async function sendResetEmail(email: string, token: string) {
  const info = await sendEmail(email, token, EmailType.Reset);
}

// Two factor email
export const sendTwoFactorEmail = async (email: string, token: string) => {
  try {
    // Step 1: Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: senderEmail, // Your email
        pass: senderPassword, // Your app password
      },
    });

    // Step 2: Email content
    const mailOptions = {
      from: `"Next Auth" <${senderEmail}>`, // Sender address
      to: email, // Recipient address
      subject: "Next Auth Two Factor Code", // Subject line
      html: `<p>Your two factor code: ${token}</p>`, // HTML content
    };

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log(info);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return;
  }
};
