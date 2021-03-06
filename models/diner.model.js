const mongoose= require('mongoose');
const  Schema = mongoose.Schema;

const dinerSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
    type:String,
    required:true
  },
  orders:[ {
    type: Schema.Types.ObjectId,
    ref: 'Order'
 }]
});

module.exports = mongoose.model('Diner', dinerSchema);