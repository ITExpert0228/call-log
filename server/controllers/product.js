var Product = require('../models/product');
const ipInfo = require("ipinfo");
var myip = require('quick-local-ip');
const requestIp = require('request-ip');
const ipdetails = require("node-ip-details");

const http = require('http');
const userIP = require('user-ip');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    ipInfo((err, cLoc) => {
        console.log("-------ipinfo");
        console.log(err || cLoc);
    });
    console.log("-------myip");
    console.log(myip.getLocalIP4());
    // console.log(myip.getLocalIP6());
    const clientIp = requestIp.getClientIp(req); 
    console.log("-------request-ip");
    console.log(clientIp);
    
    console.log("-------userIP");
    console.log(userIP(req));

    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};