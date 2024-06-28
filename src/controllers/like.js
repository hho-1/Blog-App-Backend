"use strict";

// Comment Controller:

const Like = require("../models/like");

const Contribution = require("../models/contribution");
const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Likes"]
            #swagger.summary = "List Likes"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    try {
      const data = await res.getModelList(Like);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Likes"]
            #swagger.summary = "Create Likes"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Likes' }
            }
        */

    try {
      const data = await Like.create(req.body);
      await Contribution.findByIdAndUpdate(data.contribution_id, {
        $push: { likes: data.id },
        $inc: { likes_count: 1 },
      });
      await User.findByIdAndUpdate(data.user_id, {
        $push: { likes: data.id }
      });
      res.status(201).send({ error: false, data });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Likes"]
            #swagger.summary = "Delete Likes"
        */

    try {
      const like = await Like.findOne({ _id: req.params.id });
      if (!like)
        return res.status(404).send({ error: true, message: "Like not found" });

      await Contribution.findByIdAndUpdate(like.contribution_id, {
        $pull: { likes: like.id },
        $inc: { likes_count: -1 },
      });
      await User.findByIdAndUpdate(like.user_id, {
        $pull: { likes: like.id }
      });

      await Like.deleteOne({ _id: req.params.id });

      res.status(204).send({ error: false, data: like });
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },
};
