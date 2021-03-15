var mongoose = require('mongoose');
const  Schema = mongoose.Schema;

var manuItemSchema = new Schema({
    mealName:{
        type:String
    },
    mealUrl:{
        type:String
    },
    cost:{
        type:Number
    },
    content:[],
    //referencing the resturant schema for one to many relationship
 
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Item', manuItemSchema);