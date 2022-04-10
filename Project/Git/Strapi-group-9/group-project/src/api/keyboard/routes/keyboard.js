'use strict';

/**
 * keyboard router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::keyboard.keyboard');
