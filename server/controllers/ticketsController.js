const db = require('./../models');
const { sequelize } = require('./../models')

module.exports = {
    create: async (req, res, next) => {
        // const t = await sequelize.transaction()
        try {
            // const { name, price, details, date, time, seller_id, category_id, location_id, address } = req.body
            const data = req.body
            const createTicket = await db.ticket.create({ ...data })
            console.log(data)
            res.status(201).send({
                isError: false,
                message: 'Event Successfully Created',
                data: null
            })
        } catch (error) {
            next(error)
        }
    },
    getCategory: async (req, res, next) => {
        // const t = await sequelize.transaction()
        try {
            // const { name, price, details, date, time, seller_id, category_id, location_id, address } = req.body
            // const data = req.body
            const category = await db.category.findAll()
            console.log(category)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: category
            })
        } catch (error) {
            next(error)
        }
    },
    getTicket: async (req, res, next) => {
        try {
            // ambil id dari param
            const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const ticketCategory = await db.ticket.findAll({
                where: {
                    category_id: id
                }
            })
            console.log(ticketCategory)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: ticketCategory
            })
        } catch (error) {
            next(error)
        }
    },
    getCatName: async (req, res, next) => {
        try {
            // ambil id dari param
            const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const catName = await db.category.findAll({
                where: {
                    id
                }
            })
            console.log(catName)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: catName
            })
        } catch (error) {
            next(error)
        }
    },
    getAllTicket: async (req, res, next) => {
        try {
            // ambil id dari param
            // const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const allTicket = await db.ticket.findAll()
            console.log(allTicket)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: allTicket
            })
        } catch (error) {
            next(error)
        }
    },
    // getUser: async (req, res, next) => {
    //     try {
    //         // ambil id dari param
    //         // const { id } = req.params
    //         // ambil data findOne ticket berdasarkan category_id
    //         const allTicket = await db.ticket.findAll()
    //         console.log(allTicket)
    //         res.status(201).send({
    //             isError: false,
    //             message: 'Get Success',
    //             data: allTicket
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // },

}