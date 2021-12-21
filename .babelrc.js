const isDev = process.env.NODE_ENV === "development";

module.exports = function (api) {
  api.cache(false)

  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", {decoratorsBeforeExport: true}],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      isDev && "react-refresh/babel",
      [
        'babel-plugin-import',
        {
          'libraryName': '@material-ui/core',
          // Use "'libraryDirectory': ''," if your bundler does not support ES modules
          'libraryDirectory': 'esm',
          'camel2DashComponentName': false
        },
        'core'
      ],
      [
        'babel-plugin-import',
        {
          'libraryName': '@material-ui/icons',
          // Use "'libraryDirectory': ''," if your bundler does not support ES modules
          'libraryDirectory': 'esm',
          'camel2DashComponentName': false
        },
        'icons'
      ]
  ].filter(Boolean)
  };
};
