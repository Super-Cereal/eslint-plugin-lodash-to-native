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
      url: 'https://github.com/Super-Cereal/eslint-plugin-lodash-to-native/lib/rules/map.js',
    },
    fixable: 'code',
  },
  create(context) {
    let useLodashMapRule = true;
    return {
      ExpressionStatement(node) {
        // логика переопределния переменной _
        const exp = node.expression;
        if (exp.type === 'AssignmentExpression' && exp.left.name === '_') {
          useLodashMapRule = false;
        }
      },
      CallExpression(node) {
        // логика замены lodash _.map(Array, fn) на нативный Array#map
        const callee = node.callee;
        if (
          callee.type === 'MemberExpression' &&
          callee.property.name === 'map' &&
          useLodashMapRule &&
          callee.object.name === '_' &&
          node.arguments.length === 2
        ) {
          if (
            node.arguments[0].type !== 'ArrayExpression' &&
            node.arguments[0].type === 'Identifier'
          ) {
            // дописать проверку на тип переменной
            const var1 = context
                .getScope(node.arguments[0])
                .set.get(node.arguments[0].name);
            for (let i = var1.references.length; i--; i > 0) {
              if (var1.references[i].writeExpr) {
                if (var1.references[i].writeExpr.type !== 'ArrayExpression') {
                  return;
                }
                break;
              }
            }
          }
          context.report({
            node,
            message: 'Better for u to use native Array#map, otherwise...',
            fix(fixer) {
              let start = callee.start;
              let end = callee.end + 1;
              const z1 = fixer.removeRange([start, end]);
              start = node.arguments[0].end;
              end = node.arguments[1].start;
              const z2 = fixer.replaceTextRange([start, end], '.map(');
              return [z1, z2];
            },
          });
        }
      },
    };
  },
};
