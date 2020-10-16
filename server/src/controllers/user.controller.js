const mongoose = require('mongoose');
const Poll = require('../model/Poll');
const redisDB = require('../config/redisDB');
const { promisify } = require('util');

// const redis = require('redis');


// const client = redis.createClient({
//   host: 'redis-18418.c240.us-east-1-3.ec2.cloud.redislabs.com',
//   password: '0Gf1XKw8CsRNep4bg3387bzxtPQDoTVO',
//   port: 18418
// });

// client.on('error', function (err) {
//   console.log(err)
// });

// client.on('connect', function () {
//   console.log("Redis Connected")
//   client.get('rice', console.log);
// });


// hello controller
exports.helloController = (req, res) => {
  console.log(req.body);
  res.send(`Hello ${req.body.name}`);
};


// exports.createPollController = async (req, res) => {
//   const data = {
//     title: req.body.title,
//     options: req.body.options.map((option) => ({
//       name: option,
//       count: 0,
//       option_id: mongoose.Types.ObjectId()
//     }))
//   }

//   const poll = new Poll(data);

//   try {
//     const savedPoll = await poll.save();
//     return res.status(200).json({
//       message: "Poll created successfully",
//       _id: savedPoll._id
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(501).json({
//       status: false,
//       message: "Internal server error"
//     });
//   }

// };


exports.createVoteController = async (req, res) => {
  console.log(req.body);

  // const saddAsync = promisify(redisDB.sadd).bind(redisDB);
  // const sisMembersAsync = promisify(redisDB.smembers).bind(redisDB);

  // console.log(await sisMembersAsync(req.params.poll));

  await Poll.updateOne({ 
    _id: req.params.poll
  }, {
    $inc: {
      'options.1.count': 1
    }
  });

  // await saddAsync(req.params.poll, req.body.ip);

  return res.status(200).json({
    status: true,
    message: "Vote registered successfully",
  });
};


exports.getPollController = async (req, res) => {

  // try {
  //   const poll = await Poll.findOne({ _id: req.params.poll });
  //   console.log(poll);
  //   return res.status(200).json({ poll });

  //   // Check the redis store for the data first
  // } catch (error) {
  //   console.log(error)
  //   return res.status(501).json({
  //     status: false,
  //     message: "Something went wrong",
  //   });
  // }

};