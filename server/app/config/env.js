let protocol = 'http';
let host = 'localhost';

let env = {
  // app
  PROTOCOL: protocol,
  HOST: host,
  PORT: 8000,
  // db
  USER: 'admin',
  PASSWORD: '!wJK2svh6qn5Mtv82%',
  DB: 'projetwac',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // cors
  corsOptions: {
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'device-remember-token',
      'Access-Control-Allow-Origin',
      'Origin',
      'Accept',
      'x-access-token'
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    origin: `${protocol}://${host}:3000`
  },
  // mail
  mailOptions: {
    port: 1025,
    ignoreTLS: true,
    from: 'support@wacsheet.com',
    origin: `${protocol}://${host}:3000`
  }
};

module.exports = env;
