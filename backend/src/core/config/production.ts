export default {
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  env: process.env.NODE_ENV,
};
