const router = require('express').Router();
const mongoose = require('mongoose');
const Poll = require('../model/Poll');
const redis = require('redis');

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


router.get('/welcome', (req, res) => {
  res.json({ 
    success: true, 
    message: `Ballot.io server up and running` 
  });
});


// Endpoint to create a poll
router.post('/poll/create', async (req, res) => {
  const { error } = createPollDetails.validate(req.body);
  if (error) {
    return res.status(401).json({
      status: false,
      message: error.details[0].message
    });
  }

  const data = {
    createdBy: req.body.createdBy,
    title: req.body.title,
    options: req.body.options.map((option) => ({
      name: option,
      count: 0,
      option_id: mongoose.Types.ObjectId()
    })),
    totalVotes: 0
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


// Endpoint to get list of polls created by a user (find poll by userID)
router.get('/polls/userID/:userID', async (req, res) => {
  try {
    const pollDataList = await Poll.find({ createdBy: req.params.userID });

    // return the result to the client
    return res.status(200).json({ 
      status: true,
      data: pollDataList
    });

  } catch (error) {
    console.log(error);
    process.exit();

    return res.status(501).json({
      status: false,
      message: "Something went wrong",
    });
  }
});


// Endpoint to find a particular poll based on the pollID
router.get('/poll/pollID/:pollID', async (req, res) => {
  try {
    const pollData = await Poll.findOne({ _id: req.params.pollID });

    if (pollData) {
      // return the result to the client
      return res.status(200).json({ 
        status: true,
        source: `Record from the server`,
        pollData
      });
    }
    
  } catch (error) {
    console.log(error);
    process.exit();
    return res.status(501).json({
      status: false,
      message: "Something went wrong",
    });
  }
});


// Endpoint to cast vote
router.put('/poll/:pollID/vote', async (req, res) => {
  try {
    const pollID = req.params.pollID;

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
      message: "Something went wrong"
    });
  }
});


// Endpoint to delete a poll
router.delete('/poll/:pollID/delete', async (req, res) => {
  try {
    const pollID = req.params.pollID;

    await Poll.findByIdAndDelete({ _id: pollID });
    return res.status(200).json({
      status: true,
      message: "Successfully deleted item!"
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: false,
      message: "Document could not be deleted or does not exist."
    });
  }
});


module.exports = router;