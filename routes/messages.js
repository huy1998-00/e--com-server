// const router = require("express").Router();
// const Message = require("../models/Message");
// //add
// router.post("/", async (req, res, next) => {
//   console.log(req.body);
//   const newMessage = new Message({
//     conversationId: req.body.data.conversationId,
//     sender: req.body.data.sender,
//     text: req.body.data.text,
//   });
//   try {
//     const savemessage = await newMessage.save();

//     res.status(200).json(savemessage);
//   } catch (error) {
//     if (!error.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// });

// //get
// router.get("/:conversationId", async (req, res, next) => {
//   try {
//     const messages = await Message.find({
//       conversationId: req.params.conversationId,
//     });
//     res.status(200).json(messages);
//   } catch (error) {
//     if (!error.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// });

// module.exports = router;
