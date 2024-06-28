"use strict";

// Contribution Controller:

const Contribution = require("../models/contribution");
const Comment = require("../models/comment");
const User = require("../models/user");
const Category = require("../models/category");
const Like = require("./like");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "List Contributions"
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
      const data = await res.getModelList(
        Contribution,
        {},
        "comments",
        "likes"
      );

      req.body.like_count >= 0;
      req.body.comment_count >= 0;
      req.body.post_views >= 0;

      const categories = await Category.find();
      // console.log(categories)
      const recentPosts = await Contribution.find()
        .sort({ createdAt: "desc" })
        .limit(3);

      // Add '?' parameters to url if there is not:
      if (!req.originalUrl.includes("?")) req.originalUrl += "?";

      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "Create Contribution"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Contribution' }
            }
        */

    try {
      const data = await Contribution.create(req.body);
      await User.findByIdAndUpdate(data.user_id, {
        $push: { contributions: data.id },
      });
      res.status(201).send({ error: false, data });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "Get Single Contribution"
        */

    try {
      const data = await Contribution.findById(req.params.id).populate(
        "comments"
      );
      res.status(200).send({ error: false, data });
    } catch (err) {
      res.status(404).send({ error: true, message: err.message });
    }
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "Update Contribution"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Contribution' }
            }
        */

    try {
      const data = await Contribution.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(202).send({
        error: false,
        data,
        new: await Contribution.findById(req.params.id),
      });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "Delete Contribution"
        */

    try {
      const contribution = await Contribution.findOne({
        _id: req.params.id,
      });
      if (!contribution)
        return res
          .status(404)
          .send({ error: true, message: "Contribution not found" });

      await User.findByIdAndUpdate(contribution.user_id, {
        $pull: { contributions: contribution.id },
      });
      await Comment.deleteMany({ contribution_id: contribution.id });
      await Like.deleteMany({ contribution_id: contribution.id });

      await Contribution.deleteOne({ _id: req.params.id });

      res.status(204).send({ error: false, data: contribution });
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },
};
