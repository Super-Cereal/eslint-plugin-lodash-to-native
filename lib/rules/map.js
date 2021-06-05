/* eslint-disable max-len */

/**
 * @fileoverview Rule to replace lodash map method for Array with native Array#map
 * @author SuperCereal
 */
'use strict';

const isArray = function(context, node) {
  if (node.type === 'ArrayExpression') return true;
  if (node.type === 'ObjectExpression') return false;
  // Находим переменную из текущего Scope по ее названию
  const var1 = context.getScope(node).set.get(node.name);
  // Перебираем все обращения к переменной, начиная с конца,
  // когда находим последнее переопределение переменной,
  // то определяем что в ней лежит
  for (let i = var1.references.length; i--; i > 0) {
    if (var1.references[i].writeExpr) {
      return var1.references[i].writeExpr.type === 'ArrayExpression';
    }
  }
};

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
    // переменная useLodashMapRule заведена на случай,
    // если "_" будет переопределена
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
          useLodashMapRule &&
          callee.type === 'MemberExpression' &&
          callee.property.name === 'map' &&
          callee.object.name === '_' &&
          node.arguments.length === 2
        ) {
          // Проверка на то,что первый аргумент - массив
          if (!isArray(context, node.arguments[0])) return;
          context.report({
            node,
            message: 'Better to use native Array#map',
            fix(fixer) {
              let start = callee.range[0];
              let end = callee.range[1] + 1;
              const fix1 = fixer.removeRange([start, end]);
              start = node.arguments[0].range[1];
              end = node.arguments[1].range[0];
              const fix2 = fixer.replaceTextRange([start, end], '.map(');
              return [fix1, fix2];
            },
          });
        }
      },
    };
  },
};
