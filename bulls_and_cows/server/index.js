const express = require('express');
const fs = require('fs');
const logger = require('./utils/logger');

const PORT = 8080;
const server = express();
server.use(express.json());

server.use('/', express.static('./public'));

server.post('/', (req, res) => {
    console.log(req.body);
    logger(req.body.num, req.body.guess);
});

server.get('/', (req, res) => {
    fs.readFile('./server/logs/log.txt', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        };
    });
});

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});