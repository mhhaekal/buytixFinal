const db = require('./../models');
const fs = require("fs").promises;
const { sequelize } = require("./../models");
const { createJWT } = require("./../lib/jwt");
const handlebars = require("handlebars");
const transporter = require("./../helper/transporter");
const { log } = require("console");
const { hash, match } = require('./../helper/hashing');
const { Model } = require('sequelize');



module.exports = {
    login: async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    },
    register: async (req, res, next) => {
        try {
            const { username, email, password, point } = req.body;
            //   console.log(username);
            //   console.log(email);
            //   console.log(password);
            const checkEmail = await db.user.findOne({ where: { email } });
            console.log(checkEmail);
            if (checkEmail)
                return res.status(200).send({
                    isError: true,
                    message: "Email Already Exist",
                });
            const hashPassword = await hash(password)
            const createUser = await db.user.create({ username, email, password: hashPassword, point });

            const token = await createJWT({ id: createUser.dataValues.id }, "1h");

            const readTemplate = await fs.readFile("./public/template.html", "utf-8");
            const compiledTemplate = await handlebars.compile(readTemplate);
            const newTamplate = compiledTemplate({ username, email, token });

            await transporter.sendMail({
                from: {
                    name: "BuyTix",
                    email: "buytixpurwadhika@gmail.com",
                },
                to: email,
                subject: "register",
                html: newTamplate,
            });
            //   console.log(token);
            console.log(createUser);
            res.status(200).send({
                isError: false,
                message: "success create account",
                token: token,
            });
        } catch (error) {
            next(error);
        }
    },
    verifyTokenUser: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            console.log(id);
            const verif = await db.user.findOne({ where: { id } });
            if (!verif) throw { message: "account is not exist" };
            console.log(verif);

            res.status(200).send({
                isError: false,
                message: "account is found",
                data: verif.dataValues.username,
            });
        } catch (error) {
            next(error);
        }
    },
    getOneUser: async (req, res, next) => {
        try {
            const { email, password } = req.query;
            console.log(email);
            console.log(password);
            const getUser = await db.user.findOne({ where: { email } });

            if (!getUser)
                return res.status(200).send({
                    isError: true,
                    message: "User doesn't exist",
                });
            const hashMatch = await match(password, getUser.dataValues.password)
            if (!hashMatch) throw { message: 'Wrong Password!' }
            const token = await createJWT({ id: getUser.dataValues.id }, "1h");
            res.status(200).send({
                isError: false,
                message: "login Success",
                data: getUser.dataValues.username,
                token: token,
            });
        } catch (error) {
            next(error);
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
    getTokenUser: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            console.log(id);
            const verif = await db.user.findOne({ where: { id } });
            if (!verif) throw { message: "account is not exist" };
            // console.log(verif);

            res.status(200).send({
                isError: false,
                message: "account is found",
                data: verif.dataValues,
            });
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

    getTransaction: async (req, res, next) => {
        try {
            // ambil id dari param
            const { id } = req.dataToken
            // ambil data findOne ticket berdasarkan category_id
            const trans = await db.transaction.findAll({
                where: {
                    user_id: id

                },
                include: [{
                    model: db.ticket,
                    attributes: ['name']
                }
                ]
            })
            console.log(trans)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: trans
            })

        } catch (error) {
            next(error)
        }
    },
    getSellerTicket: async (req, res) => {
        try {
            // ambil id dari param
            const { id } = req.dataToken
            // ambil data findOne ticket berdasarkan category_id
            const ticket = await db.ticket.findAll({
                include: [{
                    model: db.location,
                    attributes: ['location']
                }
                ],
                where: {
                    seller_id: id

                }
            })
            console.log(ticket)
            res.status(201).send({
                isError: false,
                message: 'Get Success',
                data: ticket
            })
        } catch (error) {
            next(error)
        }
    }
}

