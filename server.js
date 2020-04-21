const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/callback', function (req, res) {
 return res.send('pong');
});

app.post('/scb/payment/confirm', async (req, res) => {
  const body = (req, ['body']);
  console.log(body)
  res.send(body);
});
app.get('/*', function (req, res,next) {
  let ALLOW_ORIGIN = ['api-sandbox.partners.scb', 'paymentqrcode.herokuapp.com']
  let ORIGIN = req.headers.origin
     if (ALLOW_ORIGIN.includes(ORIGIN)) {
       res.header('Access-Control-Allow-Origin', ORIGIN)
     }
     res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
     res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization,resourceOwnerId,requestUId')
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
     console.log("ok")
     return next()
  
});
app.listen(port);