"use strict"


// Status Controller:

const Status = require('../models/status')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Status"]
            #swagger.summary = "List Status"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Status)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Status),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Status"]
            #swagger.summary = "Create Status"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Status' }
            }
        */

        const data = await Status.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Status"]
            #swagger.summary = "Get Single Status"
        */

        const data = await Status.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Status"]
            #swagger.summary = "Update Status"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Status' }
            }
        */

        const data = await Status.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Status.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Status"]
            #swagger.summary = "Delete Status"
        */

        const data = await Status.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}