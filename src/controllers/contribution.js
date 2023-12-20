"use strict"

// Contribution Controller:

const Contribution = require('../models/contribution')
const Comment = require('../models/comment')
const User = require('../models/user')


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

        const data = await res.getModelList(Contribution, {}, 'comments')


        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Contribution),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
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

        const data = await Contribution.create(req.body)

        await User.updateOne({_id: data.user_id}, {$push: {contributions: data.id}})

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "Get Single Contribution"
        */

        const data = await Contribution.findOne({ _id: req.params.id }).populate("comments")
        //console.log(data);


        res.status(200).send({
            error: false,
            data
        })
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

        const data = await Contribution.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Contribution.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Contributions"]
            #swagger.summary = "Delete Contribution"
        */

        const contribution = await Contribution.findOne({ _id: req.params.id })

        await User.updateOne({id: contribution.user_id}, {$pull: {contributions: contribution.id}})

        await Comment.deleteMany({contribution_id: contribution.id})

        const data = await Contribution.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}