# Rule to swap lodash map method on Array with native Array#map (map)

Правило находит использование функции _.map , например _.map(collection, fn), и, если это возможно, предлагает заменить его на использование нативного Array#map.


## Rule Details

Examples of **incorrect** code for this rule:

```js

let _ = require('lodash');
_.map([1, 2, 3], (n) => n * n);

```

Examples of **correct** code for this rule:

```js

let _ = require('lodash');
[1, 2, 3].map((n) => n * n);
_.map({1: 1, 2: 2}, (n) => n * n);

// переопределение "_"
_ = {map: (n) => 2 * n};
_.map([1, 2, 3], (n) => n * n)

```
