import config from './index.js';
console.log('dbUser', config.dbUser);
console.log('dbPass', config.dbPass);
console.log('mongoURI', config.mongoURI);
console.log('dbName', config.dbName);

export const mongoConfig = {
  uri: config.mongoURI,
  dbName: config.dbName,
  env: config.env,
};
