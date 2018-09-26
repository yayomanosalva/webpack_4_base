module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb",
        "prettier",
        "prettier/flowtype",
        "prettier/react",
        "react-app"
    ],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            impliedStrct: true,
            classes: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["react", "flowtype"],
    rules: {
        indent: ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "never"],
        "react/prop-types": 0,
        "react/jsx-filename-extension": 0
    }
};