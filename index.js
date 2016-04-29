var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var apiKey = process.env.MAIL_API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', express.static("public"));

app.post('/sendMail', function(req, res) {
  var sendgrid = require("sendgrid")(apiKey);
  var email = new sendgrid.Email();

  email.addTo("contacto@enjambrebit.com.ar");
  email.setFrom("hugoruscitti@gmail.com");

  email.setSubject("MailerForm: " + req.body.subject);
  email.setHtml("Emisor: " + req.body.email + "<p>" +
                "Mensaje: " + "<p><pre>" + req.body.message + "</pre>" +
                "<small>Este mensaje ha llegado por medio del formulario de contacto de la web.</small>");

  sendgrid.send(email);

  res.redirect("/gracias.html");
});

app.listen(5000, function() {
  console.log('listening on localhost:5000');
});
