/**
 * body-parser
 * index.test.js
 * Created by Sıdıka ÇAY on 11.09.2019
 */

"use strict";

const tiny = require("@sdk_cy/tiny-server");
const axios = require("axios");
const expect = require("chai").expect;

const bodyParser = require("./index");

const app = tiny();

const port = 8080;
const httpClient = axios.create({
    baseURL: "http://localhost:" + port
});

describe("Body parser test", function () {

    before(function () {
        app.use(bodyParser);
        app.post("/", function (req, res) {
            return res.status(200).send(JSON.stringify(req.body));
        });
        app.listen(port, function () {
            //Listening server
        });
    });

    describe("JSON parse middleware test", function () {
        it("Body parser should return posted object...", function () {
            return httpClient.post("/", {id: 0}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return expect({id: 0}).to.deep.equal(res.data);
            });
        });
    });

    describe("Urlencoded parse middleware test", function () {
        it("Body parser should return posted object...", function () {
            return httpClient.post("/", "id=0", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                return expect({"id": "0"}).to.deep.equal(res.data);
            });
        });
    });

    after(function () {
        app.close();
    });
});