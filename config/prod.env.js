'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  BACK_END_URL: '"http://localhost:4000/graphql"',
  BACK_END_WS_URL: '"ws://localhost:4000/graphql"'
});
