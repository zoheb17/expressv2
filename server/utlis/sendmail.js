import mailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

async function sendmail(to ,subject,text) {
    try {
        let transport = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"sayyedzohebuddin61859@gmail.com",
            pass:process.env.PASS 

        }
    })
    let userInfo= await transport.sendMail({
        from:"sayyedzohebuddin61859@gmail",
        to: to,
        subject:subject,
        text:text


    }); 
    console.log( "email sent",userInfo.messageId);
    } catch (error) {
        console.log(error);
    }
    
}
export default sendmail 

