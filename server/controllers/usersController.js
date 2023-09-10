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
    updatePoint: async (req, res, next) => {
        try {
            // ambil id dari param
            const { id } = req.params
            // ambil data findOne ticket berdasarkan category_id
            const getUser = await db.user.findOne({
                where: {
                    id: id
                }
            })
            // console.log(getUser.dataValues.point)
            const update = await db.user.update({ point: getUser.dataValues.point + 1 }, { where: { id: id } })
            // console.log(getUser)
            console.log(update)
            const getUser1 = await db.user.findOne({
                where: {
                    id: id
                }
            })
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: getUser1
            })

        } catch (error) {
            next(error)
        }
    },
    buyWithPoint: async (req, res, next) => {
        try {
            // ambil id dari param
            const id = req.body.id
            // ambil data findOne ticket berdasarkan category_id
            const getUser = await db.user.findOne({
                where: {
                    id: id
                }
            })
            // console.log(getUser.dataValues.point)
            const update = await db.user.update({ point: getUser.dataValues.point - 2 }, { where: { id: id } })
            // console.log(getUser)
            console.log(update)
            const getUser1 = await db.user.findOne({
                where: {
                    id: id
                }
            })
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: getUser1
            })

        } catch (error) {
            next(error)
        }
    },
    getUserId: async (req, res, next) => {
        try {
            // ambil id dari param
            const id = req.body.id
            // ambil data findOne ticket berdasarkan category_id
            const userid = await db.user.findOne({
                where: {
                    id: id
                }
            })
            console.log(userid)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: userid
            })
        } catch (error) {
            next(error)
        }
    },
}

