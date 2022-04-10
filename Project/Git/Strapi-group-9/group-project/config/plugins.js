module.exports = ({ env }) => ({
      // ...
      upload: {
        config: {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME', 'dfqx0ptfj'),
            api_key: env('CLOUDINARY_KEY', '561768949685391'),
            api_secret: env('CLOUDINARY_SECRET', 'YQAGY6yhJwYMWyekm2E12nbbLvQ'),
          },
          actionOptions: {
            upload: {},
            delete: {},
          },
        },
      },
      // ...
    });