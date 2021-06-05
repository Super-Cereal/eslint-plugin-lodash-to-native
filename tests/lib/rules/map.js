/**
 * @fileoverview Rule to swap lodash map method on Array with native Array#map
 * @author Super-Cereal
 */
'use strict';

// -------------------------------------------------------------------------
// Requirements
// -------------------------------------------------------------------------

const rule = require('../../../lib/rules/map');
const RuleTester = require('eslint').RuleTester;

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2018}});
/* eslint-disable max-len */
ruleTester.run('map', rule, {
  valid: [
    // При переопределении "_" правило не должно срабатывать после переопределения(1)
    `let _ = require('lodash');
    _ = {map: (n) => n * n};
    _.map([1, 2, 3], (n) => n * n);
    `,

    // Если первый аргумент - переменная с обьектом, то правило не должно срабатывать
    `let _ = require('lodash');
    let x = {1: 1, 2: 2, 3: 3};
    _.map(x, (n) => n * n);
    `,

    // Если первый аргумент - обьект, то правило не должно срабатывать
    `let _ = require('lodash');
    _.map({1: 1, 2: 2, 3: 3}, (n) => n * n);
    `,
  ],

  invalid: [
    // Если первый аргумент - массив, правило должно сработать
    {
      code: `
        let _ = require('lodash');
        _.map([1, 2, 3], (n) => n * n);
      `,
      errors: [{message: 'Better to use native Array#map'}],
      output: `
        let _ = require('lodash');
        [1, 2, 3].map((n) => n * n);
      `,
    },

    // Если _.map(Array, fn()) растягивается на несколько строк,
    // а правило фиксит ошибку, то не возникает лишних ошибок
    {
      code: `
        let _ = require('lodash');
        _.map([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 7, 8, 10, 9, 1, 12, 13], 
          (n) => n * n);
      `,
      errors: [{message: 'Better to use native Array#map'}],
      output: `
        let _ = require('lodash');
        [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 7, 8, 10, 9, 1, 12, 13].map((n) => n * n);
      `,
    },

    // Если первый аргумент - перменная с массивом, правило должно сработать
    {
      code: `
        let _ = require('lodash');
        let x = [1, 2, 3];
        _.map(x, (n) => n * n);
      `,
      errors: [{message: 'Better to use native Array#map'}],
      output: `
        let _ = require('lodash');
        let x = [1, 2, 3];
        x.map((n) => n * n);
      `,
    },

    // Если первый аргумент - пустой массив, правило должно работать
    {
      code: `
        let _ = require('lodash');
        _.map([], (n) => n * n);
      `,
      errors: [{message: 'Better to use native Array#map'}],
      output: `
        let _ = require('lodash');
        [].map((n) => n * n);
      `,
    },

    // При переопределении "_" правило не должно срабатывать после переопределения(2)
    {
      code: `
        let _ = require('lodash');
        _.map([1, 2, 3], (n) => n * n);
        _ = {map: (n) => n * n};
        _.map([1, 2, 3], (n) => n * n);
      `,
      errors: [{message: 'Better to use native Array#map'}],
      output: `
        let _ = require('lodash');
        [1, 2, 3].map((n) => n * n);
        _ = {map: (n) => n * n};
        _.map([1, 2, 3], (n) => n * n);
      `,
    },
  ],
});
