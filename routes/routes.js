const dinerHandler= require('../controllers/diner.cotroller.js');
const { db } = require('../models/order.model.js');
module.exports = (app)=>{
//register diner
 app.route('/diner').post(dinerHandler.createDiner);

 app.route('/restaurant').post(dinerHandler.createResturant);
 app.route('/order').post(dinerHandler.createOrder);
 app.route('/diner/:id').get(dinerHandler.getUserAndOrder);
 app.route('/restuarant/:id').delete(dinerHandler.delete);
 app.route('/restuarant/:id').get(dinerHandler.getResturents);
 app.route('/restuarant').get(dinerHandler.getAllResturents); 
 //pass customer and restuarant id in the body
 app.route('/orders').get(dinerHandler.getAllOrders);
//pass restuarant id in the body
// return 
 app.route('/manu').post(dinerHandler.createManu);
 //login to the system
 app.route('/diner/login').post(dinerHandler.loginDiner);
 app.route('/restuarant/name/:name').get(dinerHandler.getResturentByname);
 app.route('/restuarant/name/:name/id/:id').get(dinerHandler.getResturentBynameID);
 app.route('/resturants/order/:id').put(dinerHandler.updateOrder)
}