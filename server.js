var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var pug = require('pug');
require('dotenv').config();
var nodeMailer = require('nodemailer');
//init app
var app = express();


//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var port = 4000;
app.get('/', (req, res) => {
  res.render('formContact')
});

app.post('/send-email', (req, rea) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    post: 560,
    secure: false,
    auth: {
      user: process.env.MAILER_MAIL,
      pass: process.env.MAILER_PW
    }
  });

  let mailOptions = {
    from: '"salar" <mar.ha17@outlook.com>',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s , info.messageId, info.response');
    res.render('formContact');
  });
});

app.listen(4000, () => console.log('Example app listening on port + 4000!'))