var PeerServer = require('peer').PeerServer,
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.listen(port);

console.log('Listening on port', port);

new PeerServer({ port: 9000, path: '/chat' });