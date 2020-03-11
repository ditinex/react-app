
module.exports = (Mongoose) => {
    
    const Schema = Mongoose.Schema;

    const products_schema = new Schema({
        name:  {type: String, trim: true, required: true},
        price: {type: Number, default: 0, required: true},
        oldPrice: {type: Number, default: 0},
        image: {type: String, trim: true, required: true},
        createdAt: {type: Date, default: Date.now},
    },{
        autoIndex: false,
        collection: 'products',
    });

    var Model = {}
    Model.products = Mongoose.model("products", products_schema);


    return Model;
};