const db = require('./../models');

module.exports = {
    login: async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    },
    register: async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    },
    getUser: async (req, res, next) => {
        try {
            // ambil id dari param
            // const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const allTicket = await db.user.findAll()
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
}

