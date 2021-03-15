// Require all models
const db = require("../database.js");

exports.createDiner =  (req, res) => {
  try {
    const diner = new db.Diner(req.body);
     diner.save();
    res.status(201).json(diner);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.loginDiner=(req, res)=>{

  const diner = req.body;
  console.log(diner);
  db.Diner.findOne({email:diner.email})
  .then((_diner)=>{

    if(_diner.password == diner.password) {
      res.status(200).json(_diner);
    }else{
      res.status(400).json({ success: false, message: error.message });
    }
  }).catch((error)=>{
    
    res.status(400).json({ success: false, message: error.message });
  })
 
}

exports.createResturant= (req,res)=>{
    try {
        const resturant = new db.Resturant(req.body);
         resturant.save();
        res.status(201).json(resturant);
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
}

exports.createOrder= (req,res)=>{
    let data ={};
   
    db.Order.create(req.body)
    .then((_order)=>{
            
         db.Diner.findByIdAndUpdate({ _id: req.body.diner },{$push: {orders: _order.id}}, { new: true })
         .then((diner)=>{
            data['diner']=diner;
         })
         .catch(err=>{
            res.json(err);
         });

         db.Resturant.findByIdAndUpdate({ _id: req.body.resturant },{$push: {orders: _order.id}}, { new: true })
         .populate('orders')
         .then((resturant)=>{
            data['resturant']=resturant;
            res.status(201).json(resturant);
         })
         .catch(err=>{
            res.json(err);
         })
    })
}
//this method gets all users and order ids
exports.getUserAndOrder= (req,res)=>{
  
    db.Diner.findById(req.params.id)
    .then(function(diner) {
        // If we were able to successfully find an Diner with the given id, send it back to the client
        res.json(diner);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
}

//get a specific resturents and orders ids
exports.getResturents= (req,res) =>{
  db.Resturant.findById(req.params.id)
  .populate('orders')
  .then((resturant)=>{
   // If we were able to successfully find an Restuarant with the given id, send it back to the client
   res.json(resturant);
  })
  .catch((err)=>{
    // If an error occurred, send it to the client
    res.json(err);
  })
}
//get a specific resturents and orders ids
exports.getResturentByname= (req,res) =>{

  console.log(req.params.name);
  db.Resturant.findOne({name:req.params.name})
 .populate('orders')
  .populate('manu')
  .then((resturant)=>{
   // If we were able to successfully find an Restuarant with the given id, send it back to the client
   res.json(resturant);
  })
  .catch((err)=>{
    // If an error occurred, send it to the client
    res.json(err);
  })
}

//get a specific resturents and orders ids
exports.getResturentBynameID= (req,res) =>{

  console.log(req.params.id);
  db.Resturant.findOne({name:req.params.name})
  .populate('orders')
  .populate('manu')
  .then((resturant)=>{
    console.log(resturant)
   // If we were able to successfully find an Restuarant with the given id, send it back to the client
   if(req.params.id == resturant._id)
      res.json(resturant);
    else
      res.status(401).json('error');
  })
  .catch((err)=>{
    // If an error occurred, send it to the client
    res.json(err);
  })
}
//get a specific resturents and orders ids
exports.updateOrder= (req,res) =>{

  console.log(req.params.id);
   
  db.Order.findOneAndUpdate({_id:req.params.id},req.body)
  .then((order)=>{
    console.log(order);
        // If we were able to successfully find an Restuarant with the given id, send it back to the client
        db.Resturant.findById({ _id: order.resturant })
        .populate('orders')
        .populate('manu')
        .then((resturant)=>{
            res.status(201).json(resturant);
        })
        .catch(err=>{
            res.json(err);
        })
  })
  .catch((err)=>{
    // If an error occurred, send it to the client
    res.json(err);
  })
}
//get all resturants
exports.getAllResturents= (req,res) =>{
  db.Resturant.find()
  .populate('orders')
  .populate('manu')
  .then((resturant)=>{
   
   // If we were able to successfully find an Restuarant with the given id, send it back to the client
   res.json(resturant);
  })
  .catch((err)=>{
    // If an error occurred, send it to the client
    res.json(err);
  })
}
//used to get all orders

exports.getAllOrders= (req,res) =>{
  db.Order.find()
  .then((order)=>{
    // If we were able to successfully find an Restuarant with the given id, send it back to the client
    res.json(order);
   })
   .catch((err)=>{
     // If an error occurred, send it to the client
     res.json(err);
   })

  }

  //crud about manu 
  exports.createManu =(req,res)=>{
    db.Manu.create(req.body)
    .then((manu)=>{
      db.Resturant.findByIdAndUpdate({ _id: req.body.resturant },{$push:{manu:manu}},{new: true })
      .then((resturant)=>{
        res.status(201).json(resturant);
      })
    })
    .catch(err=>{
      res.json(err);
   })
  }

  // get the manu 
  exports.getManu =(req,res)=>{
    db.findById(req.params.id,{new: true })
    .then(manu=>{
      res.status(200).json(manu);
    })
    .catch(err=>{
      res.json(err);
   })
  }

  //update manu
  exports.updateManue=(req,res)=>{
      db.Manu.findByIdAndUpdate(req.params.id,req.body,{new: true })
      .then(manu=>{
        res.status(200).json(manu);
      })
      .catch(err=>{
        res.json(err);
     })
  }

  //delet resturant
  exports.deleteResturant = (req,res)=>{
    console.log(req.params.id)
    db.Resturant.findByIdAndDelete(req.params.id)
    .then(resturant=>{
      res.status(200).json(resturant);
    })
    .catch(err=>{
      res.json(err);
   })
  }
 
  exports.delete =(req, res)=> { 
    const id = req.params.id;
    console.log(req.body)
    db.Resturant.findByIdAndDelete(id, function(err, result) {
        if (err) {
            res.status(400).json(err);
        } else {
           
            db.Resturant.find((error,data)=>{
                res.status(201).json(data);
            })
        }
      });
}
  //posting manu 
  exports.postManu = (req,res)=>{
    console.log(req.body)
    db.Manu.create(req.body)
    .then((manu)=>{
      db.Resturant.findByIdAndUpdate({ _id: req.body.resturant },{$push:{manu:manu}} ,{ new: true })
    })
  }