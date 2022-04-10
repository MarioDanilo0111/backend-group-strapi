module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c5af0baeddee5636c85d717985504511'),
  },
});
