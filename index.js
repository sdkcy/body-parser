/**
 * body-parser
 * index.js
 * Created by Sıdıka ÇAY on 11.09.2019
 */

"use strict";

const url = require("url");

function bodyParser(req, res, next) {
    const contentType = req.headers["content-type"];

    if (req.method.toLowerCase() === "put" || req.method.toLowerCase() === "post") {
        if (contentType) {
            let body = Buffer.from([]);

            req.on("data", (chunk) => {
                body = Buffer.concat([body, chunk]);
            });
            req.on("end", () => {
                if (contentType.search("application/json") > -1) {
                    body = JSON.parse(body.toString());
                } else if (contentType.search("application/x-www-form-urlencoded") > -1) {
                    body = JSON.parse(JSON.stringify(url.parse("?" + body.toString(), true).query));
                } else {
                    body = body.toString();
                }

                req.body = body;

                next();
            });
            req.on("error", (error) => {
                console.log("error: ", error.message);
                throw error;
            });
        }
    } else {
        next();
    }

}

module.exports = bodyParser;