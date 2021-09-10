const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

module.exports = transporter;