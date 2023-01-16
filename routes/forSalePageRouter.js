const express = require('express');
const forSalePageRouter = express.Router();

forSalePageRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all of the for sale items to you');
})
.post((req, res) => {
    res.end(`Will add the item: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /forSale');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /forSale. Login or Contact MowerTech at (509) 555-1212 to have machine removed');
});

forSalePageRouter.route('/:id')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send the id item to you');
})
.post((req, res) => {
    res.end(`Will add the item: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /forSale/:id');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /forSale/:id . Login or Contact MowerTech at (509) 555-1212 to have machine removed');
});
module.exports = forSalePageRouter;
