const bcrypt = require('bcrypt');
const Models = require('../models')
const Postgress = Models.postgress;
const Mongoose = Models.mongoose;

//const init = Models.sequelize.sync();

module.exports = {
    
    signup : async (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        Postgress.users.sync().then(()=>{
            return Postgress.users.count({
                where: {
                    email: email,
                } 
            })
        })
        .then((data) => {
            if(data<1)
                return Postgress.users.create({ email: email, password: password });
            return data;
        })
        .then((data) => {
            if(data==1)
                res.json({error: 'User exists.'});
            else
                res.json({output: data});
        })
        .catch((err)=>{
            console.log(err);
        });
    },
    
    login : (req, res, next) => {
        let email = req.body.email || '';
        let password = req.body.password || '';

        console.log(req.body)

        Postgress.users.findOne({
            where: {
                email: email,
            } 
        })
        .then(async (data) => {
            if(data){
                if( await bcrypt.compare(password, data.password) == true)
                    return {output: data}
                else
                    return {error: 'Invalid email or password.'}
            }
            else
                return {error: 'Invalid email or password.'}
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },

    addSuggestions : (req, res, next) => {
        let userId = req.body.userId;
        let productId = req.body.productId;
        Postgress.suggestions.sync().then(()=>{
            return Postgress.suggestions.create({userId: usersId, productId: productId})
        })
        .then((data) => {
            res.json({output: data});
        })
        .catch((err)=>{
            console.log(err);
        });
    },

    listSuggestions : (req, res, next) => {
        let userId = req.params.id;
        Postgress.suggestions.findAll({
            where: {
                userId: userId,
            },
            attributes: ['productId']
        })
        .then((data) => {
            let arr = []
            //converting object list into array
            Object.keys(data).map(function(key, value) {
                arr.push(data[key]["productId"]);
            });

            if(arr.length > 0){
                return Mongoose.products.find({
                    '_id': { $in: arr}
                })
            }
            else 
                return []
        })
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },

    createProducts : (req, res, next) => {
        let name = req.body.name;
        let price = req.body.price;
        let oldPrice = (req.body.oldPrice)?req.body.oldPrice:0;
        let image = req.body.image;

        Mongoose.products({
          name: name,
          price: price,
          oldPrice: oldPrice,
          image: image
        })
        .save((err,data)=>{
            if(err)
                console.log(err)
            res.json({output: data});
        });
    },

    listProducts : (req, res, next) => {
        Mongoose.products.find({})
        .then((data)=>{
            res.json(data);
        });
    },

};