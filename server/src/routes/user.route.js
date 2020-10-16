const router = require('express').Router();
const mongoose = require('mongoose');
const Poll = require('../model/Poll');
const redis = require('redis');
const { verifyTokenController } = require('../controllers/auth.controller');

const { 
  createPollDetails
} = require('../helpers/inputChecker');


const client = redis.createClient({
  host: process.env.REDIS_CLIENT_HOST,
  password: process.env.REDIS_CLIENT_PASSWORD,
  port: process.env.REDIS_CLIENT_PORT
});

client.on('error', (err) => {
  console.log(err);
});

client.on('connect', () => {
  console.log("Redis Connected");
});


// Endpoint to create a poll
router.post('/create-poll', verifyTokenController, async (req, res) => {
  const { error } = createPollDetails.validate(req.body);
  if (error) {
    return res.status(401).json({
      status: false,
      message: error.details[0].message
    });
  }

  const data = {
    title: req.body.title,
    options: req.body.options.map((option) => ({
      name: option,
      count: 0,
      option_id: mongoose.Types.ObjectId()
    }))
  }

  const poll = new Poll(data);

  try {
    const savedPoll = await poll.save();
    return res.status(200).json({
      status: true,
      message: "Poll created successfully",
      _id: savedPoll._id
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: false,
      message: "Internal server error"
    });
  }
});


// Endpoint to get vote
router.get('/polls/:poll', (req, res) => {
  try {
    const pollID = req.params.poll;

    // Check the redis store for the data first
    client.get(pollID, async (err, record) => {
      if (record) {
        return res.status(200).json({ 
          status: true,
          source: `Record from the cache`,
          record: JSON.parse(record)
        });
      } else {
        const pollData = await Poll.findOne({ _id: req.params.poll });

        // save the record in the cache for subsequent request
        client.setex(pollID, 1440, JSON.stringify(pollData));

        // return the result to the client
        return res.status(200).json({ 
          status: true,
          source: `Record from the server`,
          pollData
        });
      }
    });

  } catch (error) {
    console.log(error)
    return res.status(501).json({
      status: false,
      message: "Something went wrong",
    });
  }
});


// Endpoint to cast vote
router.put('/polls/:poll', async (req, res) => {
  try {
    const pollID = req.params.poll;

    await client.SISMEMBER(pollID, req.body.ip, (err, result) => {
      // Check the redis store for the data first
      if (result) {
        client.SMEMBERS(pollID, console.log);
        return res.status(400).json({
          status: false,
          message: "You've already voted for this poll."
        });
      } else {
        // Update document
        Poll.updateOne({ 
          _id: req.params.poll
        }, {
          $inc: {
            'options.1.count': 1
          }
        }, (err, doc) => {
          if (err){ 
            console.log(err);
            return res.status(501).json({
              status: false,
              message: "Error updating document.",
            });
          } else {
            // save the record in the cache for subsequent request
            client.SADD(pollID, req.body.ip);
            client.SMEMBERS(pollID, console.log);

            // return the result to the client
            return res.status(200).json({
              status: true,
              message: "Vote registered successfully"
            });
          }
        });
      }
    }); 
  } catch (error)  {
    console.log(error);
    return res.status(501).json({
      status: false,
      message: "Something went wrong",
    });
  }
});


// Endpoint to delete a poll
router.delete('/polls/:poll', async (req, res) => {
  
});


module.exports = router;