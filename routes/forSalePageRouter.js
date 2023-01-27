const express = require('express');
const ForSale = require('../models/forSale');
const authenticate = require('../authenticate');

const forSalePageRouter = express.Router();

forSalePageRouter.route('/')
    .get((req, res, next) => {
        ForSale.find()
        .then(forSale => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(forSale);
        })
        .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        ForSale.create(req.body)
        .then(forSale => {
            console.log('Listing Created ', forSale);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(forSale);
        })
        .catch(err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /forSale');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        ForSale.deleteMany()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err));
    });

forSalePageRouter.route('/:id')
.get((req, res, next) => {
    ForSale.findById(req.params.campsiteId)
    .then(forSale => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(forSale);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /forSalePage/${req.params.id}`);
})
.put(authenticate.verifyUser, (req, res, next ) => {
    ForSale.findByIdAndUpdate(req.params.id, {
        $set: req.body
   }, { new: true})
   .then(forSale => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(forSale);
})
.catch(err => next(err));
})
.delete(authenticate.verifyUser, (req, res, next ) => {
    ForSale.findByIdAndDelete(req.params.id)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = forSalePageRouter;
