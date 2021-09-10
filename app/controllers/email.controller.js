const transporter = require('../config/mail.config');
const sendEmail=(req,res)=>{
    const mail = {
        from: req.body.userEmail,
        to: process.env.EMAIL,
        subject: "Kabinti User!",
        text:  `<${req.body.userEmail}> 
        \n${req.body.message} \n 
        Regards:${req.body.firstName} ${req.body.lastName}`,
      };
   
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send({message:"Thanks for contacting"});
        }
      });

}
const emailCont={
    sendEmail
}
module.exports=emailCont;