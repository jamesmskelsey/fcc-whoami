var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/api/whoami', function( req, res) {
    var headers = req.headers;
    // so cheesy, but it finds the text in the first set of parentheses, which will be our OS - pff.
    var temp = headers['user-agent'];
    var os = temp.substring(temp.search(/\(/) +1, temp.search(/\)/));
    temp = headers['accept-language'];
    var language = temp.substring(0, temp.search(/\,/));
    var ip = headers['x-forwarded-for'];
    res.send(JSON.stringify({ipaddress: ip, language: language, software: os}));
});

app.listen(app.get('port'), function() {
    console.log("Listening on port ", app.get('port'));
});