import nodemailer from "nodemailer";
// email configuration and send email
const emailProcesser = async (emailBody) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SNTP,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail(emailBody);
    console.log(nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"PraveenStore 👻" <myemail@praveenstore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hi ${emailData.fName}, please follow link to verify EMail: ${emailData.url}`, // plain text body
    html: `<p>Hi ${emailData.fName}</p>
    "<p>Hi ${emailData.url}</p>"`, // html body
  };
  emailProcesser(emailBody);
};

export const userVerifiedNotification = (emailData) => {
  const emailBody = {
    from: '"PraveenStore 👻" <myemail@praveenstore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Your account has been verified ✔", // Subject line
    text: `Hi ${emailData.fName}, verified, you can login now ${process.env.ROOT_DOMAIN}`, // plain text body
    html: `<p>Hi ${emailData.fName} has been Verified</p>
    <br/>
    `, // html body
  };
  emailProcesser(emailBody);
};
