"use strict"

// Comment Controller:

const CommentLikes = require('../models/CommentLikes')

const Comment = require('../models/comment')

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

        const data = await res.getModelList(CommentLikes)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Comment),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
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

        const data = await CommentLikes.create(req.body)
        

        await Comment.updateOne({_id: data.comment_id}, {$inc: {likes_num: +data.quantity}})

        res.status(201).send({
            error: false,
            data
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */

        const commentLike = await CommentLikes.findOne({ _id: req.params.id })

        await Comment.updateOne({_id: commentLike.comment_id}, {$inc: {likes_num: -1}})
        
        const data = await CommentLikes.deleteOne({ _id: req.params.id })

        

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}