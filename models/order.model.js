const mongoose= require('mongoose');
const {Schema} = require('mongoose');

//creating a mongo db document
//this document matches Entity for Orders
const orderSchema = new Schema({
   
   resturant: {
      type: Schema.Types.ObjectId,
      ref: 'Resturent'
   },
   diner: {
    type: Schema.Types.ObjectId,
    ref: 'Diner'
 },
   client_email:String,
   resturant_name:String,
   items:[],
   status: {
      type: String,
      default: 'pending'
  },
   created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);
