/* eslint-disable max-len */

/**
 * @fileoverview Rule to replace lodash map method for Array with native Array#map
 * @author SuperCereal
 */
'use strict';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Rule to replace lodash map method for Array with native Array#map',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/Super-Cereal/eslint-plugin-lodash-to-native',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        console.log(callee);
      },
    };
  },
};
