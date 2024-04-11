module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "standard-with-typescript",
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/class-literal-property-style": "off",
  },
  "ignorePatterns": [".eslintrc.js", ".dist/*"]
}
