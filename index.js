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

  email.addTo("hugoruscitti@gmail.com");
  email.setFrom("hugoruscitti@gmail.com");

  email.setSubject("CONTACTO WEB: " + req.body.subject);
  email.setHtml("Sender: " + req.body.email + "<p>" +
                "message: " + "<p><pre>" + req.body.message + "</pre>");

  sendgrid.send(email);

  console.log(req.body);
  res.end("Gracias!");
});

app.listen(5000, function() {
  console.log('listening on port 5000');
});
