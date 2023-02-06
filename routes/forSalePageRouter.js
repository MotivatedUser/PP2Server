const express = require('express');
const ForSale = require('../models/forSale');
const authenticate = require('../authenticate');
const cors = require('./cors');

const forSalePageRouter = express.Router();

forSalePageRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        ForSale.find()
            .then(forSale => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(forSale);
            })
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        ForSale.create(req.body)
            .then(forSale => {
                console.log('Listing Created ', forSale);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(forSale);
            })
            .catch(err => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,  authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /forSale');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,  authenticate.verifyAdmin, (req, res, next) => {
        ForSale.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

forSalePageRouter.route('/:id')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        ForSale.findById(req.params.campsiteId)
            .then(forSale => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(forSale);
            })
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /forSalePage/${req.params.id}`);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        ForSale.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
            .then(forSale => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(forSale);
            })
            .catch(err => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        ForSale.findById(req.params.id)
            .then(post => {
                if (!post) {
                    return res.status(404).json({message: "Post not found"});
                }
                if (post.author.toString() !== req.user._id.toString()) {
                    return res.status(403).json({message: "You are not authorized to delete this post"});
                }
                return post.remove();
            })
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });
    
    // .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //     ForSale.findByIdAndDelete(req.params.id)
    //         .then(response => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(response);
    //         })
    //         .catch(err => next(err));
    // });

module.exports = forSalePageRouter;
