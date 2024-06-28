"use strict";

// Comment Controller:

const Comment = require("../models/comment");
const Contribution = require("../models/contribution");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
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
      const data = await res.getModelList(Comment);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Comment' }
            }
        */

    try {
      const data = await Comment.create(req.body);
      await Contribution.findByIdAndUpdate(data.contribution_id, {
        $push: { comments: data.id },
        $inc: { comment_count: 1 },
      });
      res.status(201).send({ error: false, data });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */

    try {
      const data = await Comment.findById(req.params.id);
      res.status(200).send({ error: false, data });
    } catch (err) {
      res.status(404).send({ error: true, message: err.message });
    }
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Comment' }
            }
        */

    try {
      const data = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(202).send({ error: false, data });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }

    // const data = await Comment.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

    // res.status(202).send({
    //     error: false,
    //     data,
    //     new: await Comment.findOne({ _id: req.params.id })
    // })
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */

    try {
      const comment = await Comment.findOne({ _id: req.params.id });
      if (!comment)
        return res
          .status(404)
          .send({ error: true, message: "Comment not found" });

      await Contribution.findByIdAndUpdate(comment.contribution_id, {
        $pull: { comments: comment.id },
        $inc: { comment_count: -1 },
      });

      await Comment.deleteOne({ _id: req.params.id });

      res.status(204).send({ error: false, data: comment });
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },
};
