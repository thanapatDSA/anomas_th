module.exports = {
  presets: [["next/babel"]],
  plugins: [
    "@babel/plugin-proposal-do-expressions",
    [
      "babel-plugin-module-resolver",
      {
        root: [".", "./src"]
      }
    ]
  ]
};
