var express = require('express');
var app = express();
var path = require('path');
const port = process.env.PORT || 3000

// carrega a pasta com todos os arquivos
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname + './public/index.html'));
});

app.listen(port);
console.log("Connected to the port: "+port)