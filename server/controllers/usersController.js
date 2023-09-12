const fs = require("fs").promises;
const db = require("./../models");
const { sequelize } = require("./../models");
const { createJWT } = require("./../lib/jwt");
const handlebars = require("handlebars");
const transporter = require("./../helper/transporter");
const { log } = require("console");

module.exports = {
  login: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { username, email, password, point } = req.body;
      //   console.log(username);
      //   console.log(email);
      //   console.log(password);
      //   const checkEmail = await db.user.findOne({ where: { email } });
      //   console.log(checkEmail);
      //   if (checkEmail)
      //     return res.status(200).send({
      //       isError: true,
      //       message: "Email Already Exist",
      //     });

      const createUser = await db.user.create({ username, email, password, point });

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
      const getUser = await db.user.findOne({ where: { email, password } });
      if (!getUser)
        return res.status(200).send({
          isError: true,
          message: "email or password is invalid",
        });
      const token = await createJWT({ id: getUser.dataValues.id }, "10s");
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
      const allTicket = await db.users.findAll();
      console.log(allTicket);
      res.status(201).send({
        isError: false,
        message: "Get Success",
        data: allTicket,
      });
    } catch (error) {
      next(error);
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
};
