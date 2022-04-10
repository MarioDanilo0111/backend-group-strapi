'use strict';

/**
 * monitor service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::monitor.monitor');
