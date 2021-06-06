# Rule to swap lodash map method on Array with native Array#map (map)

Правило находит использование функции _.map , например _.map(collection, fn), и, если это возможно, предлагает заменить его на использование нативного Array#map.


## Rule Details

Examples of **incorrect** code for this rule:

```js

let _ = require('lodash');
_.map([1, 2, 3], (n) => n * n);
// правило сработает, тк первый арумент - массив
// фикс исправит код так: [1, 2, 3].map((n) => n * n)

```

```js

let _ = require('lodash');
let x = [1, 2, 3];
_.map(x, (n) => n * n);
// правило сработает, тк первый арумент - переменная с массивов
// фикс исправит код так: x.map((n) => n * n)

```

Examples of **correct** code for this rule:

```js

let _ = require('lodash');
[1, 2, 3].map((n) => n * n);
_.map({1: 1, 2: 2}, (n) => n * n);
// правило не сработает, тк первый арумент - обьект

_ = {map: (n) => 2 * n};
_.map([1, 2, 3], (n) => n * n)
// правило не сработает, тк перменная "_" была переопределена

```
