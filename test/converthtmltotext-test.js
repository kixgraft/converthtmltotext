/* eslint-env es6 */
"use strict";

const converthtmltotext = require("../src/converthtmltotext.js");

module.exports.test1 = test => {
    let result = converthtmltotext("<h1>Hello world!</h1>");
    test.equals(result, "# Hello world!");
    test.done();
};

module.exports.test2 = test => {
    let result = converthtmltotext('<a href="#">hello world</a>');
    test.equals(result, "[hello world](#)");
    test.done();
};
