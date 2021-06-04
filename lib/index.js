/**
 * @fileoverview Plugin for working with lodash
 * @author Super-Cereal
 */
'use strict';

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

const requireIndex = require('requireindex');

// ----------------------------------------------------------------------------
// Plugin Definition
// ----------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');
