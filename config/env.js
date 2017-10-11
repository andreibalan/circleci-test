const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const APP_ENV = process.env.APP_ENV;
[`${paths.dotenv}.${APP_ENV}`, paths.dotenv]
  .filter(Boolean)
  .forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv').config({ path: dotenvFile });
    }
  });

process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(fs.realpathSync(process.cwd()), folder))
  .join(path.delimiter);

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => /^APP_(?!VERSION)([A-Za-z0-9]*)/i.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV,
        PUBLIC_URL: publicUrl,
        APP_VERSION: require(paths.appPackageJson).version,
      },
    );

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
