const express = require('express');
const pp2Router = express.Router();

pp2Router.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /pp2');
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /pp2');
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /pp2');
    })
    .delete((req, res) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /pp2.');
    });
module.exports = pp2Router;