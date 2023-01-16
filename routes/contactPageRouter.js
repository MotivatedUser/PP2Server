const express = require('express');
const contactPageRouter = express.Router();

contactPageRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /contactPage');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /contactPage');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contactPage');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /contactPage. Contact MowerTech at (509) 555-1212 to cancel an appointment');
});
module.exports = contactPageRouter;