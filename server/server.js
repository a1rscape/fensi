const nodemailer = require('nodemailer');
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  auth: {
    user: 'fensi.chance@gmail.com',
    pass: 'xhjb smeo ybdn mreu',
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { combinedArray } = req.body;
  console.log(combinedArray);

  const mailOptions = {
    from: 'fensi.chance@gmail.com',
    to: 'hamlet.mihranyan@gmail.com',
    subject: 'Exam',
    text: JSON.stringify(combinedArray),
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
});

module.exports = { sendEmail };