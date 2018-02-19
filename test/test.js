/* eslint-env es6 */
'use strict';

const converthtmltotext = require('../src/converthtmltotext.js');

[
    {
        html: '<h1>Hello world!</h1>',
        text: '# Hello world!'
    },
    {
        html: '<a href="#">hello world</a>',
        text: '[hello world](#)'
    }
].forEach((test, i) => {
    let result = converthtmltotext(test.html);
    if (result !== test.text) {
        console.error('Failed to run test #' + i + '. Got output ' + JSON.stringify(result));
        process.exit(1);
    }
});

console.log('All tests passed');
