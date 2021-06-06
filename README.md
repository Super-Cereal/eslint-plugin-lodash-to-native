# eslint-plugin-lodash-to-native

Плагин для работы с библиотекой `lodash`

## Installation

Сперва необходимо установить [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Затем нужно установить `eslint-plugin-lodash-to-native`:

```
$ npm i --save-dev https://github.com/Super-Cereal/eslint-plugin-lodash-to-native.git
```


## Usage

Добавьте `lodash-to-native` к списку плагинов в файле конфигурации `.eslintrc`. Вы можете опустить приставку `eslint-plugin-`:

```json
"plugins": [
    "lodash-to-native"
]
```


Затем добавьте в `.eslintrc` необходимые вам правила, обозначив их важность(0 - подсказка, 1 - предупреждение, 2 - ошибка):

```json
"rules": {
    "lodash-to-native/rule-name": 1
}
```

## Rules
Документация к правилам доступна в папке [./docs/rules ](https://github.com/Super-Cereal/eslint-plugin-lodash-to-native/tree/master/docs/rules) 

Тесты к правилам доступны в папке [./tests/lib/rules](https://github.com/Super-Cereal/eslint-plugin-lodash-to-native/tree/master/tests/lib/rules) (Фреймворк тестирования - mocha) 

Исходный код правил доступен в папке [./lib/rules](https://github.com/Super-Cereal/eslint-plugin-lodash-to-native/tree/master/lib/rules) 

### Supported Rules
* map - Правило находит использование функции `_.map`, например `_.map(collection, fn)`, и, если это возможно, предлагает заменить его на использование нативного `Array#map`.




