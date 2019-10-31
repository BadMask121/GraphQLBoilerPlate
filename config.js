/**
 * this is the main config factory file to use different environment config
 * 
 * set your NODE_ENV to either development, staging or production to get the right setting
 */

/* eslint-disable no-undef */
require('./src/miscellaneous/polyfills/init')
const dotenv = require('dotenv');
dotenv.config();
const confEnv = require(`./environment/${process.env.NODE_ENV}/index.js`)
module.exports = {
    ...confEnv
}