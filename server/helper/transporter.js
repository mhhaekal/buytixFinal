const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "buytixpurwadhika@gmail.com",
    pass: "yyifbrfaqetkofrx",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
