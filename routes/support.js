const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jorbinarojr@gmail.com',
        pass: 'nhuu smud wcht uebg'
    }
});

router.get('/support', (req, res) => {
    res.render('support', { title: 'Поддержка', isSupport: true});
});

router.post('/support', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'jorbinarojr@gmail.com',
        subject: `Сообщение от ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true });
    });
});

module.exports = router;
    