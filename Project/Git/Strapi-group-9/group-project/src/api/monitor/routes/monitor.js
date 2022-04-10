'use strict';

/**
 * monitor router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::monitor.monitor');
