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
    getTicketDetail: async (req, res, next) => {
        try {
            // ambil id dari param
            const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const ticketDetail = await db.ticket.findOne({
                where: {
                    id
                }
            })
            console.log(ticketDetail)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: ticketDetail
            })
        } catch (error) {
            next(error)
        }
    },
    getLocation: async (req, res, next) => {
        try {
            // ambil id dari param
            // const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const location = await db.location.findAll()
            console.log(location)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: location
            })
        } catch (error) {
            next(error)
        }
    },
    referralCode: async (req, res, next) => {
        try {
            // ambil id dari param
            // const { id } = req.params
            const { code } = req.query
            console.log(code)
            // ambil data findOne ticket berdasarkan category_id
            const reff = await db.referral_code.findOne({
                where: {
                    code: code
                }
            })
            console.log(reff)
            if (reff === null) {
                res.status(500).send({
                    isError: true,
                    message: 'Get Fail',
                    data: reff
                })
            } else {
                res.status(201).send({
                    isError: false,
                    message: 'Get Success',
                    data: reff
                })
            }
        } catch (error) {
            next(error)
        }
    },
    buyTicket: async (req, res, next) => {
        // const t = await sequelize.transaction()
        try {
            // const { name, price, details, date, time, seller_id, category_id, location_id, address } = req.body
            const data = req.body
            const buyTicket = await db.transaction.create({ ...data })
            console.log(data)
            res.status(201).send({
                isError: false,
                message: 'Event Successfully Created',
                data: buyTicket
            })
        } catch (error) {
            next(error)
        }
    },
    getRefId: async (req, res, next) => {
        try {
            const data = req.body.code
            console.log(data)
            const refId = await db.referral_code.findOne({
                where: {
                    code: data
                }
            })
            if (!refId) {
                res.status(201).send({
                    isError: true,
                    message: 'gagal',
                    data: null
                })
            }
            console.log(refId)
            res.status(201).send({
                isError: false,
                message: 'Event Successfully Created',
                data: refId
            })
        } catch (error) {
            next(error)
        }
    },
    createReferral: async (req, res, next) => {
        // const t = await sequelize.transaction()
        try {
            // const { name, price, details, date, time, seller_id, category_id, location_id, address } = req.body
            const data = req.body
            const createTicket = await db.referral_code.create({ ...data })
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

}