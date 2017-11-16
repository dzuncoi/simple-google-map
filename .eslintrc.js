module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "camelcase": [0, { "properties": "never" }],
    }
};