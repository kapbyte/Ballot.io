const redis = require('redis');

module.exports = async () => {
  const client = await redis.createClient({
    host: 'redis-18418.c240.us-east-1-3.ec2.cloud.redislabs.com',
    password: '0Gf1XKw8CsRNep4bg3387bzxtPQDoTVO',
    port: 18418
  });

  client.on('error', function (err) {
    console.log(err);
  });

  client.on('connect', function () {
    console.log("Redis Connected...");
  });
}