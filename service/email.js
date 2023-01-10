// import nodeoutlook from 'nodejs-nodemailer-outlook'

// export function myEmail(dest, subject, message) {
//     nodeoutlook.sendEmail({
//         auth: {
//             user: process.env.SenderEmail,
//             pass:process.env.SenderPassword
//         },
//         from: process.env.SenderEmail,
//         to: dest,
//         subject,
//         html: message,
//         tls:{
//             rejectUnauthorized:false
//         },
//         onError: (e) => console.log({FailToSendEmail:e}),
//         onSuccess: (i) => console.log({SuccessToSendEmail:i})
//     }
//     );
// }
import nodemailer from "nodemailer";

export async function sendEmail(email, subject, msg, attachment = null) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SenderEmail,
      pass: process.env.SenderPassword
    }
  }); 

  let info = await transporter.sendMail({
    from: process.env.SenderEmail,
    to: email,
    subject: subject,
    html: msg,
    attachments: attachment
  });
}
