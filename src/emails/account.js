const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email , name) => {
    sgMail.send({
        to: email,
        from: 'daksharmad@gmail.com',
        subject: 'Welcome to the app',
        text:  `Welcome to the app, ${name}. Enjoy using it and try our new features as well.` 
    })

}

const sendCancelationEmail = (email , name) => {
    sgMail.send({
        to: email,
        from: 'daksharmad@gmail.com',
        subject: 'Hope you enjoyed our services , see you soon !!',
        text:  `Goodbye, ${name}. Hope to see you back sometimes soon.` 
    })

}


module.exports = {
    sendWelcomeEmail , 
    sendCancelationEmail
}
























// sgMail.send({
//     to: 'aryangangwar000@gmail.com' ,
//     from: 'daksharmad@gmail.com' ,
//     subject: 'This is my first creation !',
//     text: ' Hey , how are you !!'
// })