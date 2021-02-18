const library = process.env.LIBRARYNAME;
const dirname = `${__dirname}/..`;

module.exports = {
  entry: `${dirname}/src/production/index.js`,
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: `${library}.min.js`,
    library,
    path: `${dirname}/lib`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};