'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./dev.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACK_END_URL: '"http://localhost:4000/graphql"',
  BACK_END_WS_URL: '"ws://localhost:4000/graphql"',
  APP_NAME: '"Recap"',
  TEAM_NAME: '"OpenSource"'
});
