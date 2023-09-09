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
}