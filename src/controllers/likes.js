"use strict"

// Comment Controller:

const Likes = require('../models/likes')

const Contribution = require('../models/contribution')

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

        const data = await res.getModelList(Likes)

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

        const data = await Likes.create(req.body)
        

        await Contribution.updateOne({_id: data.contribution_id}, {$inc: {likes: +data.quantity}})

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

        const like = await Likes.findOne({ _id: req.params.id })

        await Contribution.updateOne({_id: like.contribution_id}, {$inc: {likes: -1}})
        
        const data = await Likes.deleteOne({ _id: req.params.id })

        

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}