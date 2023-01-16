const express = require('express');
const aboutPageRouter = express.Router();

aboutPageRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /aboutPage');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /aboutPage');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /aboutPage');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /aboutPage. ');
});
module.exports = aboutPageRouter;