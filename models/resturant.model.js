var mongoose = require('mongoose');
const  Schema = mongoose.Schema;

var resturanSchema = new Schema({
    name: { type : String , unique : true, required : true},
    logo_url:{type : String ,required : true},
    openingTime:{type : String ,required : true},
    closingTime:{type : String ,required : true},

    //referencing the orders schema for one to many relationship
    orders:[{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }],
       // referencing manu schema
    manu:[{
        type: Schema.Types.ObjectId,
        ref: 'Manu'
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Resturent', resturanSchema);