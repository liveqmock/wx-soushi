module.exports ={
  "root": true,
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "window": true,
    "document": true,
    "$": true,
    "global": true
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "no-console": "off"
  }
}