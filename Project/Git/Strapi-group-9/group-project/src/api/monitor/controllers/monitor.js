'use strict';

/**
 *  monitor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::monitor.monitor');
