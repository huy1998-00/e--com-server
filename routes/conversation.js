// const router = require("express").Router();
// const Conversation = require("../models/conversation");

// //new conv
// router.post("/create", async (req, res) => {
//   const newConversation = new Conversation({
//     members: [req.body.senderId, "63e992b636080da80b4d9de4"],
//   });

//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   } catch (error) {
//     if (!error.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// });
// //get conv
// router.get("/:userId", async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const conversation = await Conversation.find({
//       members: { $in: [userId] },
//     });
//     res.status(200).json(conversation);
//   } catch (error) {
//     if (!error.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// });

// module.exports = router;
