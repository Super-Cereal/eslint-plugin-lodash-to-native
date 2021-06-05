# eslint-plugin-lodash-to-native

Plugin for working with lodash

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lodash-to-native`:

```
$ npm i --save-dev https://github.com/Super-Cereal/eslint-plugin-lodash-to-native.git
```


## Usage

Add `lodash-to-native` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-to-native"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lodash-to-native/rule-name": 1
    }
}
```

## Supported Rules

* map - Правило находит использование функции _.map , например _.map(collection, fn), и, если это возможно, предлагает заменить его на использование нативного Array#map.





