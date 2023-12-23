"use strict"

// Comment Controller:

const CommentDislikes = require('../models/CommentDislikes')

const Comment = require('../models/comment')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["CommentDislikes"]
            #swagger.summary = "List CommentDislikes"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(CommentDislikes)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(CommentDislike),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["CommentDislikes"]
            #swagger.summary = "Create CommentDislikes"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Comment' }
            }
        */

        const data = await CommentDislikes.create(req.body)
        

        await Comment.updateOne({_id: data.comment_id}, {$push: {comment_dislikes: data.id}})
        await Comment.updateOne({_id: data.comment_id}, {$inc: {dislikes_num: +1}})

        res.status(201).send({
            error: false,
            data
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["CommentDislikes"]
            #swagger.summary = "Delete CommentDislikes"
        */

        const commentDislike = await CommentDislikes.findOne({ _id: req.params.id })

        await Comment.updateOne({_id: commentDislike.comment_id}, {$inc: {dislikes_num: -1}})
        await Comment.updateOne({_id: commentDislike.comment_id}, {$pull: {comment_dislikes: commentDislike.id}})
        
        const data = await CommentDislikes.deleteOne({ _id: req.params.id })

        

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}