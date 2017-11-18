module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "camelcase": [0, { "properties": "never" }],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "react/forbid-prop-types": [0, { "forbid": ['any', 'array', 'object'], checkContextTypes: true, checkChildContextTypes: true }]
    },
    "globals": {
        "document": true,
        "foo": true,
        "window": true,
        "navigator": true,
        "google": true,
    }
};