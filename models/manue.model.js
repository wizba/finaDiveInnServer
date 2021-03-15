var mongoose = require('mongoose');
const  Schema = mongoose.Schema;

var manuSchema = new Schema({
   
    //referencing the orders schema for one to many relationship
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturent'
     },
     mealName:{
        type:String
    },
    mealUrl:{
        type:String
    },
    cost:{
        type:Number
    },
    content:[]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Manu', manuSchema);