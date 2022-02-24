//GET Method
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const getCurrency = async (req, res, next) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, "../" + req.params.type + ".json"));
        const stats = JSON.parse(data);
        const convert_rate = req.params.convert;
        const conversion_rates_uppercase = convert_rate.toUpperCase();

        const newStats = {
            base_code: stats.base_code,
            currency_convert: stats.conversion_rates[conversion_rates_uppercase],
            currency_country: conversion_rates_uppercase,
        };

        if (newStats.currency_convert === undefined || newStats.currency_convert === null) {
            const err = new Error("Currency stats not found");
            err.status = 404;
            throw err;
        }
        res.status(200).json(newStats);
    } catch (e) {
        next(e);
    }
};

router.route("/api/v1/:type/:convert").get(getCurrency);

module.exports = router;