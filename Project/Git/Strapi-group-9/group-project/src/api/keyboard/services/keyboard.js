'use strict';

/**
 * keyboard service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::keyboard.keyboard');
