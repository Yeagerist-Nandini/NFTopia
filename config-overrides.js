// // This file is included to deal with issues regarding react-scripts v5.0.0 and web3
// // Provided from Web3 documentation -> https://github.com/ChainSafe/web3.js#troubleshooting-and-known-issues

// const webpack = require('webpack');

// module.exports = function override(config) {
//     const fallback = config.resolve.fallback || {};
//     Object.assign(fallback, {
//         "crypto": require.resolve("crypto-browserify"),
//         "os": require.resolve("os-browserify/browser"),
//         "path":require.resolve("path-browserify")
//     })
//     config.resolve.fallback = fallback;
//     config.plugins = (config.plugins || []).concat([
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer']
//         })
//     ])
//     return config;
// }